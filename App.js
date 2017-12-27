import React from 'react';
import { View, Platform, StatusBar, Button } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DecksList from './components/DecksList';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { purple, white, silver } from './utils/colors';
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
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: `${navigation.state.params.deckId}`,
      headerStyle: {
        backgroundColor: purple
      },
      headerRight: navigation.state.params.fromCreate ? (
        <Button
          title="Home"
          color={silver}
          onPress={() => navigation.navigate('Home')}
        />
      ) : null
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      title: 'Add Card',
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      title: `Quiz: ${navigation.state.params.deckId}`,
      headerStyle: {
        backgroundColor: purple
      }
    })
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
