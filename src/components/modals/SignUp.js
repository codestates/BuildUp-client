import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../actions/index";
require("dotenv").config();
const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;

function SignUp(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [reEmail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleInputValue = (key) => (e) => {
    if (key === "USERNAME") setUsername(e.target.value);
    else if (key === "EMAIL") setEmail(e.target.value);
    else if (key === "REEMAIL") setReEmail(e.target.value);
    else if (key === "PASSWORD") setPassword(e.target.value);
    else if (key === "REPASSWORD") setRePassword(e.target.value);
  };

  const handleSignUp = () => {
    // 1. 빈 곳 있는지 확인
    // 2. Validation Test(이메일, 비밀번호 일치, 조건확인)
    // 3. Send Request
    axios
      .post(`${scheme}://${host}:${port}/user/signup`, {
        username,
        email,
        password,
      })
      .then((data) => {
        console.log(data);
        dispatch(setModalType("LOGIN"));
      })
      .catch((err) => {
        // 중복된 이메일일 경우 별도 에러메시지 출력
        console.log(err);
      });
  };

  return (
    <div id="modal-signup">
      <div id="modal-signup-box">
        <div id="modal-header-signup">
          <div>
            <label>회원가입 페이지</label>
          </div>
          <div>
            <button onClick={props.handleModalToggle}>&times;</button>
          </div>
        </div>
        <div id="modal-section">
          <div id="section-signup">
            <div>
              <label for="username" required>
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleInputValue("USERNAME")}
              />
            </div>
            <div>
              <label for="Email" required>
                Email
              </label>
              <input
                type="text"
                name="Email"
                onChange={handleInputValue("EMAIL")}
              />
            </div>
            <div>
              <label for="confirm Email" required>
                Confirm Email
              </label>
              <input
                type="text"
                name="confirm Email"
                onChange={handleInputValue("REEMAIL")}
              />
            </div>
            <div>
              <label for="pwd" required>
                Password
              </label>
              <input
                type="password"
                name="pwd"
                onChange={handleInputValue("PASSWORD")}
              />
            </div>
            <div>
              <label for="confirm pwd" required>
                Confirm Password
              </label>
              <input
                type="password"
                name="pwd"
                onChange={handleInputValue("REPASSWORD")}
              />
            </div>
          </div>
        </div>
        <div id="modal-footer">
          <button onClick={handleSignUp}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
