import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import currentUserReducer from './current_user_reducer';
import movieDataReducer from './movie_data_reducer';
import likedMoviesReducer from './liked_movies_reducer';
import nowPlayingMoviesReducer from './now_playing_movies_reducer';
import popularMoviesReducer from './popular_movies_reducer';
import trendingMoviesReducer from './trending_movies_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  current_user: currentUserReducer,
  movie_data: movieDataReducer,
  liked_movies: likedMoviesReducer,
  now_playing_movies: nowPlayingMoviesReducer,
  popular_movies: popularMoviesReducer,
  trending_movies: trendingMoviesReducer
});

export default rootReducer;
