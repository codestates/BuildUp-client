import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  toggleLoginStatus,
  toggleModal,
  setUserInfo,
} from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import { Router } from "react-router";

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
    <div id="modal-login">
      <div id="modal-login-box">
        <div id="modal-header-login" className="disable-select">
          <h2 className="inactive lineHover" onClick={props.handleModalType}>
            Sign up
          </h2>
          <h2 className="active lineHover">Sign in</h2>
        </div>
        <div id="modal-section">
          <div id="section-login">
            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon" />
              <input
                className="input-field"
                type="text"
                onChange={handleInputValue("EMAIL")}
                placeholder="Email"
              />
            </div>

            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faUnlockAlt} size="2x" className="icon" />
              <input
                className="input-field"
                type="password"
                onChange={handleInputValue("PASSWORD")}
                placeholder="password"
              />
            </div>
          </div>
          <div id="sub-login-box">
            <div id="auto-login">
              <label for="auto-login">자동 로그인</label>
              <input
                type="checkbox"
                name="auto-login"
                defaultChecked={true}
                onChange={handleInputValue("AUTOLOGIN")}
              />
            </div>
            <div id="find-password">
              {/* <input
                type="button"
                defaultChecked={true}
                onChange={handleInputValue("AUTOLOGIN")}
                value="비밀번호 찾기"
              /> */}
            </div>
          </div>
        </div>
        <div id="modal-footer">
          <div id="footer-login">
            <button onClick={handleLogin} className="login-btn">
              로그인
            </button>
          </div>
          <div id="social-box">
            <div id="gitHub-btn-box"></div>
            <div id="google-btn-box">
              <button className="google-btn">Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
