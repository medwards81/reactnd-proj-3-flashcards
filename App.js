import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DecksList from './components/DecksList';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Tabs = TabNavigator(
  {
    Decks: {
      screen: DecksList,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      title: 'DECKS',
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
