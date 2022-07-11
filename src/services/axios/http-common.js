import axios from "axios";
// import {
//   SESSION_EXPIRED,
//   UNAUTHORIZED,
//   UNATHORIZED_MESSAGE,
//   USER_NOT_FOUND,
//   USER_NOT_FOUND_MESSAGE,
// } from "../../constants";

// import AuthDataService from '../auth.service';

const { BACKEND_URL } = window["runConfig"];

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  console.log("LocalStorage-token", token);
  if (token) {
    config.headers.Authorization = "Basic " + token;
  }

  return config;
});

// instance.interceptors.response.use(
//   (response) => {
//     console.log("response axios-interceptor: ", response);
//   },
//   (error) => {
//     if (error.response.status == 403) {
//       // refreshToken();
//     }
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     if (response.data.code !== null && response.data.code !== undefined) {
//       if (response.data.code === USER_NOT_FOUND) {
//         localStorage.setItem(USER_NOT_FOUND_MESSAGE, true);
//       } else if (response.data.code === UNAUTHORIZED) {
//         localStorage.setItem(UNATHORIZED_MESSAGE, true);
//       } else if (response.data.code === SESSION_EXPIRED) {
//         AuthDataService.logout(SESSION_EXPIRED);
//       } else {
//         return response;
//       }
//     }

//     if (
//       response.status === 200 &&
//       response.headers['content-type'] === 'text/csv'
//     ) {
//       return response;
//     }
//   },
//   (error) => {
//     console.log(error);
//   }
// );

export default instance;
