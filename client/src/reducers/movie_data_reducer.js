import { REQUEST_MOVIE_DATA, RECEIVE_MOVIE_DATA, REJECT_MOVIE_DATA, RESET_MOVIE_SEARCH } from '../actions/types';

const INITIAL_STATE = {
  data: '',
  isFetching: false,
  error: ''
};

const movieDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_MOVIE_DATA:
      return {
        ...state,
        isFetching: action.payload
      };
    case RECEIVE_MOVIE_DATA:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: ''
      };
    case REJECT_MOVIE_DATA:
      return {
        ...state,
        data: '',
        isFetching: false,
        error: action.payload
      };
    case RESET_MOVIE_SEARCH:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default movieDataReducer;
