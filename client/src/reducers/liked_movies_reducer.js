import { SAVE_LIKED_MOVIE, DELETE_LIKED_MOVIE } from '../actions/types';

const INITIAL_STATE = {
  data: []
};

const likedMoviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_LIKED_MOVIE:
      return {
        ...state,
        data: [...action.payload]
      };
    case DELETE_LIKED_MOVIE:
      return {
        ...state,
        data: state.data.filter(movie => movie.movieId !== action.payload)
      };
    default:
      return state;
  }
};

export default likedMoviesReducer;
