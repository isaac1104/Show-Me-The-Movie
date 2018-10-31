import axios from 'axios';
import { REQUEST_AUTH, AUTH_USER, AUTH_ERROR } from './types';

export const fetchCurrentUser = () => async dispatch => {
  dispatch({ type: REQUEST_AUTH, payload: true });
  try {
    const request = await axios.get('/api/current_user');
    const { data } = request;
    dispatch({ type: AUTH_USER, payload: data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Login Credentials!' });
  }
};
