import deepFreeze from "deep-freeze-es6";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../constants/actions";

const initialState = {
  isFetching: false,
  data: {},
  errorMessage: ""
};

export const loginRequest = (state, action) => {
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage
  };
};

export const loginSuccess = (state, action) => {
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage,
    data: action.data
  };
};

export const loginFailure = (state, action) => {
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage,
    data: action.data
  };
};

export default (state = initialState, action) => {
  deepFreeze(state);
  deepFreeze(action);

  switch (action.type) {
    case LOGIN_REQUEST:
      return loginRequest(state, action);
    case LOGIN_SUCCESS:
      localStorage.setItem("likedComment", JSON.stringify([]));
      return loginSuccess(state, action);
    case LOGIN_FAILURE:
      return loginFailure(state, action);
    default:
      return state;
  }
};
