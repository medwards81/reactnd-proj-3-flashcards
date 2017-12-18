import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux';
//import { addDeck } from '../actions'
import { purple, white } from '../utils/colors';

// function SubmitBtn({ onPress }) {
//   return (
//     <TouchableOpacity
//       style={
//         Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
//       }
//       onPress={onPress}
//     >
//       <Text style={styles.submitBtnText}>SUBMIT</Text>
//     </TouchableOpacity>
//   );
// }

class AddDeck extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  };
  // increment = metric => {
  //   const { max, step } = getMetricMetaInfo(metric);
  //
  //   this.setState(state => {
  //     const count = (state[metric] = step);
  //
  //     return {
  //       ...state,
  //       [metric]: count > max ? max : count
  //     };
  //   });
  // };
  // submit = () => {
  //   const key = timeToString();
  //   const entry = this.state;
  //
  //   this.props.dispatch(
  //     AddDeck({
  //       [key]: entry
  //     })
  //   );
  //
  //   this.setState(() => ({
  //     run: 0,
  //     bike: 0,
  //     swim: 0,
  //     sleep: 0,
  //     eat: 0
  //   }));
  //
  //   // navigate to home
  //
  //   submitEntry({ key, entry });
  //
  //   // clean local notification
  // };
  // reset = () => {
  //   const key = timeToString();
  //
  //   this.props.dispatch(
  //     addEnty({
  //       [key]: getDailyReminderValue()
  //     })
  //   );
  //
  //   // route to home
  //
  //   removeEntry(key);
  // };
  render() {
    // const metaInfo = getMetricMetaInfo();
    //
    // if (this.props.alreadyLogged) {
    //   return (
    //     <view style={styles.center}>
    //       <Ionicons
    //         name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
    //         size={100}
    //       />
    //       <Text>You already logged your information for today</Text>
    //       <TexButton style={{ padding: 10 }} onPress={this.reset}>
    //         Reset
    //       </TexButton>
    //     </view>
    //   );
    // }

    return (
      <View>
        <Text>Add deck!</Text>
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
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
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
    alignSelf: 'flex-end',
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

const mapStateToProps = state => {
  //const key = timeToString();
  return {
    //alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    temp: 'temp'
  };
};

export default connect(mapStateToProps)(AddDeck);
