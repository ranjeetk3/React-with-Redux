import axios from "axios";

export let commonHeaders = {
  "Content-Type": "application/json",
};

export const generateUrl = (baseUrl, apiUrl = "") => `${baseUrl}${apiUrl}`;

export const apiGet = ({ url }) => axios.get(url, { headers: commonHeaders });

export const apiDelete = ({ url }) =>
  axios.delete(url, { headers: commonHeaders });

export const apiGetExternal = ({ url }) => axios.get(url);

export const apiPost = ({ url, params }) =>
  axios.post(url, { ...params }, { headers: commonHeaders });

export const apiPut = ({ url, params }) =>
  axios.put(url, { ...params }, { headers: commonHeaders });
