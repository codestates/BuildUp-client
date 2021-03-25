require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const parseJSON = require("date-fns/parseJSON");
const addMinutes = require("date-fns/addMinutes");
const addSeconds = require("date-fns/addSeconds");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;
const api_key = process.env.REACT_APP_SERVER_APIKEY;
const accessSecret = process.env.REACT_APP_SERVER_ACCESS_SECRET;
const URL = `${scheme}://${host}:${port}`;

// --------- Fetch API --------- //
const app = axios.create({
  baseURL: URL,
  withCredentials: true,
});

axios.default.withCredentials = true;

export const fetch_custom = {
  // ! ENDPOUNT: USER
  getUserInfo: (token) => {
    // * RETURN: data = {username, email}
    const result = axios
      .get(`${URL}/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then((data) => {
        const { username, email } = data.data.data;
        return { username, email };
      })
      .catch((err) => console.log(err));
    return result;
  },

  // ! ENDPOUNT: TODO
  getTodoInfo: async (token) => {
    // * RETURN: data = [todoItems...]
    const datas = await axios
      .get(`${URL}/todo/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then((data) => {
        const datas = data.data;
        return datas;
      })
      .catch((err) => console.log(err));

    const items = datas.data;
    const days = datas.day;

    const result = items.map((el) => {
      for (let i = 0; i < days.length; i++) {
        if (days[i][1] === el.date_id) {
          const date = days[i][0].slice(0, 10);
          const item = { ...el, date, checked: el.isChecked };
          return item;
        }
      }
      return el;
    });

    return result;
  },

  createTodo: (token, data) => {
    // * DATA: {content, order, now: date}
    // * RETURN: id(PK);

    const result = axios
      .post(
        `${URL}/todo/create`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
          crossDomain: true,
        },
      )
      .then((data) => {
        const pk = data.data.data.id;
        return pk;
      })
      .catch((err) => console.log(err));
    return result;
  },

  updateTodo: (token, data) => {
    // * DATA: {id, content, order, checked}
    // * RETURN: nothing;

    const result = axios
      .put(
        `${URL}/todo/update`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
          crossDomain: true,
        },
      )
      .then((data) => {})
      .catch((err) => console.log(err));
    return result;
  },

  removeTodo: async (token, data) => {
    // * DATA: {id}
    // * RETURN: nothing;

    const result = axios
      .delete(`${URL}/todo/remove`, {
        data: { data },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        crossDomain: true,
      })
      .then((data) => {})
      .catch((err) => console.log(err));
    return result;
  },

  getAccessToken: (token) => {
    // * RETURN: NEW ACCESSTOKEN
    const result = axios
      .get(`${URL}/user/refreshtokenrequest`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
        const token = data.data.accessToken;
        console.log("새로 발급된 ACCESSTOKEN은", token);
        return token;
      })
      .catch((err) => console.log("ACCESS TOKEN 발급에 문제가 있습니다", err));

    return result;
  },
};

// --------- DECODE ACCESS WEB TOKEN --------- //

export const jwt_isExpired = (token) => {
  // // ! TRUE: EXPIRED, FALSE: NOT EXPIRED
  let result;
  if (!token) return true;

  const decoded = jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) {
      console.log("ACCESS TOKEN이 만료되었습니다.", err);
      result = true;
      return;
    }
    console.log("ACCESS TOKEN이 유효합니다");
    result = false;
  });
  return result;
};

// --------- 현재 시간을 기준으로 년/월/일을 얻을 수 있는 메서드 --------- //
// ! date-fns의 format을 사용하세요
// ! 일부 스크립트에 남아있어 리펙토링 이전까지 남겨둡니다.

const dayLabel = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const monthLabel = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const js_date = {
  getYear: (date, type = "string") => {
    if (type === "number") return date.getFullYear();
    return date.getFullYear().toString().padStart(4, "0");
  },

  getMonth: (date, type = "string") => {
    if (type === "number") return date.getMonth() + 1;
    if (type === "label") return monthLabel[date.getMonth()];
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

// --------- YYYY-MM-DD 포멧에서 년/월/일을 얻는 메서드 --------- //

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

// --------- 구글 위치정보 확인 서비스 --------- //
// TODO: 사용자 위치정보를 확인하기 전 기본 배경화면으로 설정합니다.
// TODO: 사용자가 위치정보를 허용하면, Openweather API정보로 서버의 날씨별 이미지 URL을 얻으세요.

export const geoInit = () => {
  var startPos;
  var geoOptions = {
    maximumAge: 5 * 60 * 1000,
    timeout: 10 * 1000,
  };

  var geoSuccess = function (position) {
    startPos = position;

    // ! 위치정보를 가져오는지 확인합니다.(임시)
    const coords = {
      latitude: startPos.coords.latitude,
      longitude: startPos.coords.longitude,
    };
    const code = getWeatherCode(getWeather(coords));
  };
  var geoError = function (error) {
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

// --------- 유효성 검사 메서드입니다 --------- //

export const isValidEamil = (str) => {
  // ! 이메일 유형에 맞는지
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(str);
};

export const isValidPassword = (str) => {
  // ! 비밀번호는 8자 이상, 20자 이하로 작성해야 합니다.
  // ! 비밀번호는 특수문자(공백, 줄바꿈 포함)이 없어야합니다.
  // ! 비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8, 20}$/;
  return regExp.test(str);
};

export const isValidID = (str) => {
  // !아이디는 대소문자 구분없이 영문 + 숫자로 작성해야 합니다.
  // ! 아이디는 5자 이상, 15자 이하여야 합니다.
  const regExp = /^[A-za-z0-9]{5,15}/g;
  return regExp.test(str);
};
