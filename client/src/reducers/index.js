import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';
import movieDataReducer from './movie_data_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  current_user: currentUserReducer,
  movie_data: movieDataReducer
});

export default rootReducer;
