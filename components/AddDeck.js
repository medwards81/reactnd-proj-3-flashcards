import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { saveDeckTitle } from '../utils/api';
import MyTextInput from './MyTextInput';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { purple, white } from '../utils/colors';
import { NavigationActions } from 'react-navigation';
import { setLocalNotification } from '../utils/helpers';
import dismissKeyboard from 'react-native-dismiss-keyboard';

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
  submit = ({ title }) => {
    const inserted = new Date().getTime();
    this.props.addDeck({
      [title]: { title, cards: [], inserted }
    });

    dismissKeyboard();

    this.toDeckDetail(title);

    saveDeckTitle(title, inserted).then(() => {
      setLocalNotification();
    });
  };

  toDeckDetail = id => {
    this.props.navigation.navigate('DeckDetail', {
      deckId: id,
      fromCreate: true
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <Field
          name={'title'}
          placeholder="Deck title"
          component={MyTextInput}
        />
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
  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  }

  return errors;
};

export default reduxForm({
  form: 'addDeck',
  validate
})(connect(null, actions)(AddDeck));
