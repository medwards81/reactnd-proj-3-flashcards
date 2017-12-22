import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
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

class AddDeck extends Component {
  renderField({
    input: { onChange, ...restInput },
    meta: { touched, error, warning }
  }) {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          {...restInput}
        />

        {touched &&
          ((error && <Text>{error}</Text>) ||
            (warning && <Text>{warning}</Text>))}
      </View>
    );
  }
  submit = ({ title }) => {
    if (!title.length) return false;

    this.props.dispatch(
      addDeck({
        [title]: { title: title, cards: [] }
      })
    );

    this.toHome();

    saveDeckTitle(title).then(() => {
      //clearLocalNotification().then(setLocalNotification);
    });
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <Field
          name={'title'}
          placeholder="Deck title"
          style={styles.input}
          component={MyTextInput}
        />
        <SubmitBtn onPress={handleSubmit(this.submit.bind(this))} />
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
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 30,
    padding: 10
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
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
});

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  return errors;
};

export default reduxForm({
  form: 'addDeck',
  validate
})(connect(null, actions)(AddDeck));
