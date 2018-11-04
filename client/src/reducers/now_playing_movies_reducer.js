import { REQUEST_NOW_PLAYING_MOVIES, RECEIVE_NOW_PLAYING_MOVIES, REJECT_NOW_PLAYING_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: ''
};

const nowPlayingMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_NOW_PLAYING_MOVIES:
      return {
        ...state,
        isFetching: action.payload
      };
    case RECEIVE_NOW_PLAYING_MOVIES:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case REJECT_NOW_PLAYING_MOVIES:
      return {
        ...state,
        isFetching: false,
        data: '',
        error: action.payload
      };
    default:
      return state;
  }
};

export default nowPlayingMoviesReducer;
