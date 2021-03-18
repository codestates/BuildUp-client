// Action Types
const axios = require("axios");

export const ACTIONS = {
  SET_USERINFO: "SET_USERINFO",
  SET_ACCESSTOKEN: "SET_ACCESSTOKEN",
  SET_REFRESHTOKEN: "SETREFRESHTOKEN",
  TOGGLE_MODAL: "TOGGLE_MODAL",
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
