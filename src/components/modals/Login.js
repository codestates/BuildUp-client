import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  toggleLoginStatus,
  toggleModal,
  setUserInfo,
} from "../../actions/index";
require("dotenv").config();

const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAutoLogin, setAutoLogin] = useState("");

  const handleInputValue = (key) => (e) => {
    if (key === "EMAIL") setEmail(e.target.value);
    else if (key === "PASSWORD") setPassword(e.target.value);
    else if (key === "AUTOLOGIN") setAutoLogin(e.target.checked);
  };

  const handleLogin = () => {
    console.log(process.env);
    // 0. 빈 곳 있는지 확인
    // 1. Validation Test 통과하지 않을경우 에러 메시지 출력 + Return
    // 2. Send Request to Server
    axios
      .post(`${scheme}://${host}:${port}/user/login`, { email, password })
      .then((data) => {
        const token = data.data.accessToken;
        dispatch(setAccessToken(token));
        dispatch(toggleModal());
        dispatch(toggleLoginStatus());
        return axios.get(`${scheme}://${host}:${port}/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      })
      .then((data) => {
        const { username, email } = data.data;
        dispatch(setUserInfo(username, email));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="modal-header">
        <span></span>
        <button onClick={props.handleModalToggle}>X</button>
      </div>
      <div id="modal-section">
        <div>
          <span>Username</span>
          <input type="text" onChange={handleInputValue("EMAIL")}></input>
        </div>
        <div>
          <span>Password</span>
          <input
            type="password"
            onChange={handleInputValue("PASSWORD")}
          ></input>
        </div>
        <div>
          <label>자동 로그인</label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={handleInputValue("AUTOLOGIN")}
          ></input>
        </div>
        <div>
          <button>GitHub</button>
          <button>Google</button>
        </div>
      </div>
      <div id="modal-footer">
        <button onClick={handleLogin}>확인</button>
      </div>
    </>
  );
}

export default Login;
