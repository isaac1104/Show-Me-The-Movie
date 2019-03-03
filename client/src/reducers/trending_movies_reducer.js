import { REQUEST_TRENDING_MOVIES, RECEIVE_TRENDING_MOVIES, REJECT_TRENDING_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  data: '',
  isFetching: false,
  errorMsg: null
};

const trendingMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TRENDING_MOVIES:
      return {
        ...state,
        data: '',
        isFetching: action.payload,
        errorMsg: null
      };
    case RECEIVE_TRENDING_MOVIES:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        errorMsg: null
    };
    case REJECT_TRENDING_MOVIES:
      return {
        ...state,
        data: '',
        isFetching: false,
        errorMsg: action.payload
    };
    default:
      return state;
  }
};

export default trendingMoviesReducer;
