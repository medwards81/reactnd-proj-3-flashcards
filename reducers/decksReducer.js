import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions';

const decks = (state = {}, action) => {
  let newState;
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
      newState = { ...state };
      delete newState[action.deck];
      return newState;
    case ADD_CARD:
      newState = { ...state };
      newState[action.data.title].cards.push(action.data.card);
      return newState;
    default:
      return state;
  }
};

export default decks;
