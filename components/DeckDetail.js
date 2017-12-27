import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { purple, white, silver } from '../utils/colors';
import TextButton from './TextButton';
import { removeDeck as removeDeckAction } from '../actions';
import { getDeck, removeDeck as removeDeckFromStorage } from '../utils/api';

const SubmitBtn = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const SubmitBtnGhost = ({ onPress, text = {} }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios'
          ? styles.iosSubmitBtnGhost
          : styles.AndroidSubmitBtnGhost
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnTextGhost}>{text}</Text>
    </TouchableOpacity>
  );
};

class DeckDetail extends Component {
  state = {
    ready: false,
    deck: { cards: [] }
  };

  componentDidMount() {
    const { deckId } = this.props;

    getDeck(deckId).then(deck =>
      this.setState(() => ({
        ready: true,
        deck
      }))
    );
  }

  deleteDeck = () => {
    const { removeDeckFromState, goBack, deckId } = this.props;

    removeDeckFromState(deckId);
    goBack();
    removeDeckFromStorage(deckId);
  };

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      deckId: this.props.deckId
    });
  };

  addCard = deckId => {
    this.props.navigation.navigate('AddCard', {
      deckId,
      onNavBack: this.handleOnNavBack
    });
  };

  handleOnNavBack = card => {
    let newDeck = { ...this.state.deck };
    newDeck.cards.push(card);
    this.setState({ deck: newDeck });
  };

  render() {
    if (!this.state.ready)
      return <ActivityIndicator size="large" color={purple} />;

    const { deck: { title, cards } } = this.state;

    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cards}>
          {cards.length + ' ' + (cards.length == 1 ? 'card' : 'cards')}
        </Text>
        <SubmitBtnGhost
          key="addCard"
          onPress={() => this.addCard(title)}
          text="ADD CARD"
        />
        {cards.length ? (
          <SubmitBtn
            key="startQuiz"
            onPress={this.startQuiz}
            text="START QUIZ"
          />
        ) : null}
        <TextButton style={{ margin: 40 }} onPress={this.deleteDeck}>
          DELETE DECK
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  title: {
    fontSize: 40,
    alignSelf: 'center'
  },
  cards: {
    fontSize: 18,
    color: silver,
    marginBottom: 15
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
    width: 125
  },
  iosSubmitBtnGhost: {
    borderColor: purple,
    borderWidth: 1,
    backgroundColor: white,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
  },
  AndroidSubmitBtnGhost: {
    borderColor: purple,
    borderWidth: 1,
    backgroundColor: white,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  submitBtnTextGhost: {
    color: purple,
    fontSize: 22,
    textAlign: 'center',
    width: 125
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    decks: state.decks,
    deckId
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    removeDeckFromState: () => dispatch(removeDeckAction(deckId)),
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
