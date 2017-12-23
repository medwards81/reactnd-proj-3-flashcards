import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK } from '../actions';

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case REMOVE_DECK:
      const newState = { ...state };
      delete newState[action.deck];
      return newState;
    default:
      return state;
  }
};

export default decks;
