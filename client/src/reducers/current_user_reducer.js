import { REQUEST_AUTH, AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  isFetching: null,
  data: '',
  error: ''
};

const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...state,
        isFetching: action.payload,
        data: '',
        error: ''
      };
    case AUTH_USER:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: ''
      };
    case AUTH_ERROR:
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

export default currentUserReducer;
