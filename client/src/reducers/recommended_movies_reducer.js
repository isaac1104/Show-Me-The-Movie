import { REQUEST_RECOMMENDED_MOVIES, RECEIVE_RECOMMENDED_MOVIES, REJECT_RECOMMENDED_MOVIES } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: ''
};

const recommendedMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_RECOMMENDED_MOVIES:
      return {
        ...state,
        isFetching: action.payload
      };
    case RECEIVE_RECOMMENDED_MOVIES:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case REJECT_RECOMMENDED_MOVIES:
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

export default recommendedMoviesReducer;
