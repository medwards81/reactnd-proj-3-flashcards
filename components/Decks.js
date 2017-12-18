import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
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

  // renderItem = ({ today, ...metrics }, formattedDate, key) => (
  //   <View style={styles.item}>
  //     {today
  //       ? <View>
  //           <DateHeader date={formattedDate}/>
  //           <Text style={styles.noDataText}>
  //             {today}
  //           </Text>
  //         </View>
  //       : <TouchableOpacity
  //           onPress={() => this.props.navigation.navigate(
  //             'EntryDetail',
  //             { entryId: key }
  //           )}
  //         >
  //           <MetricCard date={formattedDate} metrics={metrics} />
  //         </TouchableOpacity>}
  //   </View>
  // )

  renderNoDecks = () => (
    <View style={styles.item}>
      <Text style={styles.noDataText}>
        You haven't created any decks yet. Click New Deck to add one.
      </Text>
    </View>
  );

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    //console.log({ decks, ready });

    if (ready === false) return <AppLoading />;

    return Object.keys(decks).length ? (
      <View>
        <Text>JSON.stringify(decks))</Text>
      </View>
    ) : (
      this.renderNoDecks()
    );
  }
}

const styles = StyleSheet.create({
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
    paddingTop: 20,
    paddingBottom: 20
  }
});

const mapStateToProps = decks => ({
  decks
});

export default connect(mapStateToProps)(DecksList);
