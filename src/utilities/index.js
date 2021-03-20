require("dotenv").config();

const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;

export const getUserInfo = (callback) => {
  axios.get(`${scheme}://${host}:${port}/user/info`, {});
};

// --------- 현재 시간을 기준으로 년/월/일을 얻을 수 있는 메서드 --------- //

const dayLabel = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export const js_date = {
  getYear: (date, type = "string") => {
    if (type === "number") return date.getFullYear();
    return date.getFullYear().toString().padStart(4, "0");
  },

  getMonth: (date, type = "string") => {
    if (type === "number") return date.getMonth() + 1;
    const month = date.getMonth() + 1;
    return month.toString().padStart(2, "0");
  },

  getDay: (date, type = "string") => {
    if (type === "number") return date.getDate();
    return date.getDate().toString().padStart(2, "0");
  },

  getLabel: (date, type = "string") => {
    const idx = date.getDay();
    if (type === "number") return idx;
    return dayLabel[idx];
  },
};

// --------- 데이터베이스의 생성날짜에서 년/월/일을 얻는 메서드 --------- //

export const db_date = {
  // DB 날짜의 형식을 YYYY-MM-DD로 잡았을 때 기준입니다.
  getYear: (date, type) => {
    if (type === "number") return Number(date.slice(0, 4));
    return date.slice(0, 4);
  },

  getMonth: (date, type) => {
    if (type === "number") return Number(date.slice(5, 7));
    return date.slice(5, 7);
  },

  getDay: (date, type) => {
    if (type === "number") return Number(date.slice(5, 7));
    return date.slice(8, 10);
  },

  getLabel: (date, type = "string") => {
    const idx = date.getDay();
    if (type === "number") return idx;
    return dayLabel[idx];
  },
};
