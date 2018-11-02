import { REQUEST_LIKED_MOVIES, RECEIVE_LIKED_MOVIES, REJECT_LIKED_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  error: ''
};

const likedMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LIKED_MOVIES:
      return {
        ...state,
        isFetching: action.payload
      };
    case RECEIVE_LIKED_MOVIES:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case REJECT_LIKED_MOVIES:
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

export default likedMoviesReducer;
