// Action Types
const axios = require("axios");

export const ACTIONS = {
  // User
  SET_USERINFO: "SET_USERINFO",
  // Token
  SET_ACCESSTOKEN: "SET_ACCESSTOKEN",
  SET_REFRESHTOKEN: "SETREFRESHTOKEN",
  // Modal
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SET_MODALTYPE: "SET_MODALTYPE",
  // Date Selector
  SET_DATESELECTOR: "SET_DATESELECTOR",
};

// Action Creator Funcs

// export const fetchData = (
//   action,
//   [api, method, data, headers, withCredentials],
// ) => (dispatch) => {
//   return axios({
//     url: api,
//     method: method,
//     data: data,
//     headers: headers,
//     withCredentials: withCredentials,
//   })
//     .then((data) => dispatch(action(data)))
//     .catch((err) => console.log("Fetch Error", err));
// };

// -------------User--------------- //

export const setUserInfo = (username, email) => {
  return {
    type: ACTIONS.SET_USERINFO,
    payload: { username, email },
  };
};

// -------------Access, Refresh Token--------------- //

export const setAccessToken = (accessToken) => {
  return {
    type: ACTIONS.SET_ACCESSTOKEN,
    payload: { accessToken },
  };
};

export const setRefreshToken = (refreshToken) => {
  return {
    type: ACTIONS.SET_REFRESHTOKEN,
    payload: { refreshToken },
  };
};

// -------------Modal--------------- //

export const toggleModal = () => {
  return {
    type: ACTIONS.TOGGLE_MODAL,
  };
};

export const setModalType = (type) => {
  return {
    type: ACTIONS.SET_MODALTYPE,
    payload: { type },
  };
};

// -------------Modal--------------- //

export const setDateSelector = (year, month, day) => {
  return {
    type: ACTIONS.SET_DATESELECTOR,
    payload: { year, month, day },
  };
};
