import React from 'react';
import { Platform, Button } from 'react-native';
import DecksList from './DecksList';
import DeckDetail from './DeckDetail';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import Quiz from './Quiz';
import Settings from './Settings';
import { purple, white, silver } from '../utils/colors';
import { TabNavigator, StackNavigator } from 'react-navigation';

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
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Settings'
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
          color={purple}
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

export default MainNavigator;
