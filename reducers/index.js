import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import decksReducer from './decksReducer';

const rootReducer = combineReducers({
  form: formReducer,
  decks: decksReducer
});

export default rootReducer;
