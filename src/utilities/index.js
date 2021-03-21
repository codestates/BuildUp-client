require("dotenv").config();
const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;
const api_key = process.env.REACT_APP_SERVER_APIKEY;

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

// --------- 위치정보 확인 서비스 --------- //

export const geoInit = () => {
  var startPos;
  var geoOptions = {
    maximumAge: 5 * 60 * 1000,
    timeout: 10 * 1000,
  };

  var geoSuccess = function (position) {
    startPos = position;
    console.log(startPos.coords.latitude);
    console.log(startPos.coords.longitude);

    // ! 위치정보를 가져오는지 확인합니다.(임시)
    const coords = {
      latitude: startPos.coords.latitude,
      longitude: startPos.coords.longitude,
    };
    const code = getWeatherCode(getWeather(coords));
    console.log("Weather code :", code);
  };
  var geoError = function (error) {
    console.log("Error occurred. Error code: " + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};

export const getWeather = (coords) => {
  const { latitude, longitude } = coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

  return axios.get(url).then((data) => data.data.weather[0].id);
};

export const getWeatherCode = (code) => {
  code = Number(code);
  // * 200번대: 2(뇌우)
  if (0 < code && code < 300) return 2;
  // * 300, 500번대: 5(비)
  else if (code < 600) return 5;
  // * 800번: 8(맑음)
  else if (code === 800) return 7;
  // * 600번대: 6(눈)
  else return 8;
};
