import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/actions";

import get from "lodash/get";
import { generateUrl, apiPost, apiPut } from "./core";
import { apiBasePath } from "../config";
import { ENDPOINT } from "../constants/api";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  errorMessage: "",
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  errorMessage: "",
  data,
});

export const loginFailure = (errorMessage) => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  data: errorMessage,
});

export const loginApi = (params) => {
  return apiPost({
    url: generateUrl(apiBasePath, ENDPOINT.LOGIN),
    params,
  })
    .then((response) => {
      return get(response, "data", []);
    })
    .catch((err) => {
      return get(err, "message", []);
    });
};

export const updateUser = (params, id) => {
  return apiPut({
    url: generateUrl(apiBasePath, `${ENDPOINT.UPDATE}/${id}`),
    params,
  })
    .then((response) => {
      return get(response, "data", []);
    })
    .catch((err) => {
      return get(err, "message", []);
    });
};
