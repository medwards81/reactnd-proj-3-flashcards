import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks, addDeck } from '../actions';
import { getDecks } from '../utils/api';
import { white } from '../utils/colors/';
import { AppLoading } from 'expo';

class DecksList extends Component {
  state = {
    ready: false
  };
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() =>
        this.setState(() => ({
          ready: true
        }))
      );
  }

  renderDecks = decks => {
    return (
      <View style={styles.item}>
        {Object.keys(decks).map(title =>
          this.renderItem(title, decks[title].cards)
        )}
      </View>
    );
  };

  renderItem = (title, cards) => {
    return (
      <View key={title}>
        <Text style={{ fontSize: 35 }}>{title}</Text>
        <Text>{cards.length} cards</Text>
      </View>
    );
  };

  renderEmptyDecks = () => (
    <View style={styles.item}>
      <Text style={styles.noDataText}>
        You haven't created any decks yet. Click New Deck to add one.
      </Text>
    </View>
  );

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    console.log({ decks, ready });

    if (ready === false) return <AppLoading />;

    return (
      <View style={styles.container}>
        {Object.keys(decks).length
          ? this.renderDecks(decks)
          : this.renderEmptyDecks()}
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
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  }
});

const mapStateToProps = ({ decks }) => ({
  decks
});

export default connect(mapStateToProps)(DecksList);
