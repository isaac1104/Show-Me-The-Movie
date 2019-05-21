import { REQUEST_MOVIE_DATA, RECEIVE_MOVIE_DATA, REJECT_MOVIE_DATA, SORT_MOVIE_DATA, RESET_MOVIE_DATA } from '../actions/types';

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
        isFetching: action.payload,
        data: '',
        error: ''
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
    case SORT_MOVIE_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          results: [...state.data.results].sort((a,b) => b[action.payload] - a[action.payload])
        },
        isFetching: false,
        error: ''
      };
    case RESET_MOVIE_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default movieDataReducer;
