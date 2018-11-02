import axios from 'axios';
import * as types from './types';

export const fetchCurrentUser = () => async dispatch => {
  dispatch({ type: types.REQUEST_AUTH, payload: true });
  try {
    const request = await axios.get('/api/current_user');
    const { data } = request;
    dispatch({ type: types.AUTH_USER, payload: data });
  } catch (e) {
    dispatch({ type: types.AUTH_ERROR, payload: 'Invalid Login Credentials!' });
  }
};

export const searchForMovies = (title, page) => async dispatch => {
  dispatch({ type: types.REQUEST_MOVIE_DATA, payload: true });
  try {
    const request = await axios.get('/api/movie_search', {
      params: {
        title,
        page
      }
    });
    const { data } = request;
    dispatch({ type: types.RECEIVE_MOVIE_DATA, payload: data });
  } catch (e) {
    dispatch({ type: types.REJECT_MOVIE_DATA, payload: e });
  }
};

export const fetchMovieData = id => async dispatch => {
  dispatch({ type: types.REQUEST_MOVIE_DATA, payload: true });
  try {
    const request = await axios.get('/api/movie_data', {
      params: {
        id
      }
    });
    const { data } = request;
    dispatch({ type: types.RECEIVE_MOVIE_DATA, payload: data });
  } catch (e) {
    dispatch({ type: types.REJECT_MOVIE_DATA, payload: e });
  }
};

export const resetMovieData = () => ({
  type: types.RESET_MOVIE_DATA,
  payload: ''
});

export const saveLikedMovie = values => async dispatch => {
  try {
    const request = await axios.post('/api/liked_movies', values);
    const { data } = request;
    dispatch({ type: types.SAVE_LIKED_MOVIE, payload: data });
  } catch (e) {
    dispatch({ type: types.SAVE_LIKED_MOVIE, payload: e });
  }
};

export const deleteLikedMovie = movieId => async dispatch => {
  try {
    const request = await axios.delete('/api/liked_movies', {
      params: {
        movieId
      }
    });
    const { data } = request;
    dispatch({ type: types.DELETE_LIKED_MOVIE, payload: data });
  } catch (e) {
    dispatch({ type: types.DELETE_LIKED_MOVIE, payload: e });
  }
};
