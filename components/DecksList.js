import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import { purple, white } from '../utils/colors/';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import sortBy from 'sort-by';
import { clearLocalNotification } from '../utils/helpers';

class DecksList extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(decks => {
        if (Object.keys(decks).length < 1) clearLocalNotification();
        this.setState(() => ({
          ready: true
        }));
      });
  }

  toDeckDetail = id => {
    this.props.navigation.navigate('DeckDetail', {
      deckId: id
    });
  };

  renderDecks = decks => {
    const data = Object.keys(decks).map(title => decks[title]);
    data.sort(sortBy('-inserted'));
    return (
      <List containerStyle={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              titleStyle={styles.listItem}
              subtitle={
                item.cards.length +
                ' ' +
                (item.cards.length == 1 ? 'card' : 'cards')
              }
              containerStyle={{ borderBottomWidth: 1 }}
              onPress={() => this.toDeckDetail(item.title)}
            />
          )}
          keyExtractor={(item, index) => item.title}
        />
      </List>
    );
  };

  renderEmptyDecks = () => (
    <View style={styles.item}>
      <MaterialCommunityIcons
        name="alert-circle-outline"
        color={purple}
        size={32}
        style={styles.center}
      />
      <Text style={[styles.noDataText, styles.center]}>
        No decks found. Click New Deck to add one.
      </Text>
    </View>
  );

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) return <AppLoading />;

    return (
      <View style={styles.container}>
        <View>
          {Object.keys(decks).length
            ? this.renderDecks(decks)
            : this.renderEmptyDecks()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: white
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
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
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
  list: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItem: {
    fontSize: 20
  }
});

const mapStateToProps = ({ decks }) => ({
  decks
});

export default connect(mapStateToProps)(DecksList);
