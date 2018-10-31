import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  current_user: currentUserReducer
});

export default rootReducer;
