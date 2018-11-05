import { REQUEST_POPULAR_MOVIES, RECEIVE_POPULAR_MOVIES, REJECT_POPULAR_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: ''
};

const popularMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_POPULAR_MOVIES:
      return {
        ...state,
        isFetching: action.payload
      };
    case RECEIVE_POPULAR_MOVIES:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case REJECT_POPULAR_MOVIES:
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

export default popularMoviesReducer;
