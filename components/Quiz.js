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
import FlipCard from 'react-native-flip-card';

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
      score: 0,
      flip: false
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
    const { cards, score, currentCard, flip, cardFace } = this.state;

    const isComplete = currentCard == cards.length;
    const newScore = result == 'right' ? score + 1 : score;
    const nextCard = isComplete ? currentCard : currentCard + 1;

    this.setState({
      score: newScore,
      currentCard: nextCard,
      complete: isComplete,
      cardFace: 'question',
      flip: false
    });
  }

  flipCard() {
    let cardFace;
    if (this.state.cardFace === 'question') cardFace = 'answer';
    else cardFace = 'question';
    this.setState({ cardFace, flip: !this.state.flip });
  }

  resetQuiz() {
    this.setState({
      ready: true,
      currentCard: 1,
      complete: false,
      cardFace: 'question',
      score: 0,
      flip: false
    });
  }

  exitQuiz() {
    this.props.navigation.goBack();
  }

  render() {
    if (!this.state.ready)
      return <ActivityIndicator size="large" color={purple} />;

    const { cards, currentCard, cardFace, complete, score, flip } = this.state;
    const { question, answer } = cards[currentCard - 1];

    console.log({ flip, cardFace });

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
    else
      return (
        <View style={styles.cardsContainer}>
          <Text
            style={styles.counter}
          >{`${currentCard} / ${cards.length}`}</Text>
          <View style={styles.center}>
            <FlipCard
              flip={flip}
              style={styles.card}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              clickable={false}
              alignHeight={true}
              alignWidth={true}
            >
              {/* Face Side */}
              <View style={[styles.faceBack, styles.face]}>
                <Text style={styles.faceBackText}>{question}</Text>
              </View>
              {/* Back Side */}
              <View style={[styles.faceBack, styles.back]}>
                <Text style={styles.faceBackText}>{answer}</Text>
              </View>
            </FlipCard>
            <TextButton
              style={{
                margin: 20,
                color: purple,
                fontSize: 20,
                marginBottom: 40
              }}
              onPress={this.flipCard}
            >
              {this.state.cardFace === 'question' ? 'ANSWER' : 'QUESTION'}
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
  cardsContainer: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: 'space-between'
  },
  counter: {
    fontSize: 18,
    marginBottom: 30
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
  centerCard: {
    flex: 1,
    justifyContent: 'space-between',
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
  },
  card: {
    width: 350,
    borderColor: '#CCC'
  },
  faceBack: {
    flex: 1,
    justifyContent: 'center'
  },
  faceBackText: {
    fontSize: 30,
    textAlign: 'center'
  },
  face: {
    backgroundColor: '#F2F2F2'
  },
  back: {
    backgroundColor: '#F2F2F2'
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
