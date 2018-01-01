import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { purple, silver } from '../utils/colors';

class Settings extends Component {
  state = {
    allowNotifications: true
  };

  _onValueChange(value) {
    console.log(value);
    this.setState({
      allowNotifications: value
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.option}>
            Notifications {this.state.allowNotifications}
          </Text>
        </View>
        <View>
          <Switch
            onValueChange={value => this._onValueChange(value)}
            onTintColor={purple}
            thumbTintColor={silver}
            value={this.state.allowNotifications}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  option: {
    fontSize: 22
  }
});

export default Settings;
