export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});

export const addDeck = deck => ({
  type: ADD_DECK,
  deck
});
