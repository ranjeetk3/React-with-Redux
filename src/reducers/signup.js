import deepFreeze from "deep-freeze-es6";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../constants/actions";
import { updateNameInfo } from "../firebase/users";

const initialState = {
  isFetching: false,
  data: {},
  errorMessage: "",
};

export const signupRequest = (state, action) => {
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage,
  };
};

export const signupSuccess = (state, action) => {
  const data = action.data.data;
  updateNameInfo(data._id, "firstName", data.firstName);
  updateNameInfo(data._id, "lastName", data.lastName);
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage,
    data: action.data,
  };
};

export const signupFailure = (state, action) => {
  return {
    ...state,
    isFetching: action.isFetching,
    errorMessage: action.errorMessage,
    data: action.data,
  };
};

export default (state = initialState, action) => {
  deepFreeze(state);
  deepFreeze(action);

  switch (action.type) {
    case SIGNUP_REQUEST:
      return signupRequest(state, action);
    case SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case SIGNUP_FAILURE:
      return signupFailure(state, action);
    default:
      return state;
  }
};
