import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import MyTextInput from './MyTextInput';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { purple, white } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}

class AddCard extends Component {
  submit = ({ question, answer }) => {
    const title = this.props.navigation.state.params.deckId;
    const card = { question, answer };
    this.props.addCard(title, card);
    addCardToDeck(title, card);
    this.toDeckDetails(card);
  };

  toDeckDetails = card => {
    this.props.navigation.state.params.onNavBack(card);
    this.props.navigation.goBack();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>Add Card</Text>
        <Field
          name={'question'}
          placeholder="Question"
          component={MyTextInput}
        />
        <Field name={'answer'} placeholder="Answer" component={MyTextInput} />
        <SubmitBtn onPress={handleSubmit(this.submit.bind(this))} />
        <KeyboardSpacer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  title: {
    fontSize: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const validate = values => {
  const errors = {};
  if (!values.question || !values.question.trim()) {
    errors.question = 'Question is required';
  }

  if (!values.answer || !values.answer.trim()) {
    errors.answer = 'Answer is required';
  }
  return errors;
};

export default reduxForm({
  form: 'AddCard',
  validate
})(connect(null, actions)(AddCard));
