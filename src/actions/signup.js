import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../constants/actions";

import get from "lodash/get";
import { generateUrl, apiPost, apiGet } from "./core";
import { apiBasePath } from "../config";
import { ENDPOINT } from "../constants/api";

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
  isFetching: true,
  errorMessage: "",
});

export const signupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  errorMessage: "",
  data,
});

export const signupFailure = (errorMessage) => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  errorMessage,
});

export const signupApi = (params) => {
  return (dispatch) => {
    dispatch(signupRequest());
    return apiPost({
      url: generateUrl(apiBasePath, ENDPOINT.SIGNUP),
      params,
    })
      .then((response) => dispatch(signupSuccess(get(response, "data", []))))
      .catch((err) => dispatch(signupFailure(get(err, "message", []))));
  };
};

export const verifyUser = (id) => {
  return apiGet({
    url: generateUrl(apiBasePath, `${ENDPOINT.VERIFY_USER}?id=${id}`),
  })
    .then((response) => {
      return get(response, "data", []);
    })
    .catch((err) => {
      return get(err.response, "data", []);
    });
};
