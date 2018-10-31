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

export const fetchMovieData = title => async dispatch => {
  dispatch({ type: types.REQUEST_MOVIE_DATA, payload: true });
  try {
    const request = await axios.get('/api/movie_search', {
      params: {
        title
      }
    });
    const { data } = request;
    dispatch({ type: types.RECEIVE_MOVIE_DATA, payload: data });
  } catch (e) {
    dispatch({ type: types.REJECT_MOVIE_DATA, payload: e });
  }
};

export const resetMovieSearch = () => ({
  type: types.RESET_MOVIE_SEARCH,
  payload: ''
});
