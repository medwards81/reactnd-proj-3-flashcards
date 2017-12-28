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

const SubmitBtn = ({ onPress, text, style = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      style={[
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
        style
      ]}
      onPress={onPress}
    >
      <Text style={[styles.submitBtnText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const SubmitBtnGhost = ({ onPress, text = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios'
          ? styles.iosSubmitBtnGhost
          : styles.AndroidSubmitBtnGhost
      }
      onPress={onPress}
    >
      <Text style={[styles.submitBtnTextGhost, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.flipCard = this.flipCard.bind(this);
    this.exitQuiz = this.exitQuiz.bind(this);

    this.state = {
      ready: false,
      cards: [],
      currentCard: 1,
      complete: false,
      cardFace: 'question',
      score: 0
    };
  }

  componentDidMount() {
    const { deckId } = this.props;

    getDeck(deckId).then(deck =>
      this.setState(() => ({
        ready: true,
        cards: deck.cards
      }))
    );
  }

  makeAnswer(result) {
    const { cards, score, currentCard } = this.state;

    const isComplete = currentCard == cards.length;
    const newScore = result == 'right' ? score + 1 : score;
    const nextCard = isComplete ? currentCard : currentCard + 1;

    this.setState({
      score: newScore,
      currentCard: nextCard,
      complete: isComplete,
      cardFace: 'question'
    });
  }

  flipCard() {
    let cardFace;
    if (this.state.cardFace === 'question') cardFace = 'answer';
    else cardFace = 'question';
    this.setState({ cardFace });
  }

  resetQuiz() {
    this.setState({
      ready: true,
      currentCard: 1,
      complete: false,
      cardFace: 'question',
      score: 0
    });
  }

  exitQuiz() {
    this.props.navigation.goBack();
  }

  render() {
    if (!this.state.ready)
      return <ActivityIndicator size="large" color={purple} />;

    const { cards, currentCard, cardFace, complete, score } = this.state;
    const { question, answer } = cards[currentCard - 1];

    if (complete)
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={styles.complete}>Quiz Complete!</Text>
          <Text
            style={styles.score}
          >{`Score: ${score} / ${cards.length}`}</Text>
          <SubmitBtnGhost
            onPress={() => this.exitQuiz()}
            textStyle={{ fontSize: 18 }}
            text="EXIT QUIZ"
          />
          <SubmitBtn
            textStyle={{ fontSize: 18 }}
            onPress={() => this.resetQuiz()}
            text="RESTART QUIZ"
          />
        </View>
      );

    return (
      <View style={[styles.container]}>
        <Text style={styles.counter}>{`${currentCard} / ${cards.length}`}</Text>
        <View style={styles.center}>
          {cardFace === 'question' ? (
            <Text style={styles.question}>{question}</Text>
          ) : (
            <Text style={styles.question}>{answer}</Text>
          )}
          <TextButton
            style={{
              margin: 20,
              color: purple,
              fontSize: 20,
              marginBottom: 40
            }}
            onPress={this.flipCard}
          >
            {cardFace === 'question' ? 'ANSWER' : 'QUESTION'}
          </TextButton>
          <SubmitBtn
            style={{ backgroundColor: '#008000' }}
            onPress={() => this.makeAnswer('right')}
            text="CORRECT"
          />
          <SubmitBtn
            style={{ backgroundColor: '#d4271b' }}
            onPress={() => this.makeAnswer('wrong')}
            text="INCORRECT"
          />
        </View>
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
  counter: {
    fontSize: 18
  },
  question: {
    fontSize: 30
  },
  complete: {
    fontSize: 30,
    color: purple
  },
  score: {
    fontSize: 22,
    marginBottom: 30
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
    deckId
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
