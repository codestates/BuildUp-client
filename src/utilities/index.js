require("dotenv").config();

const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;

export const getUserInfo = (callback) => {
  axios.get(`${scheme}://${host}:${port}/user/info`, {});
};
