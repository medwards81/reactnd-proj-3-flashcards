import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { purple, white, errorColor, errorTextColor } from '../utils/colors';
/**
 * to be wrapped with redux-form Field component
 */
export default function MyTextInput(props) {
  const { input, meta: { touched, error, warning }, ...inputProps } = props;
  const errorStyle = touched && error ? styles.inputError : {};

  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={[styles.input, errorStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    backgroundColor: purple
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
  inputError: {
    backgroundColor: errorColor,
    color: errorTextColor,
    borderColor: errorTextColor
  }
});
