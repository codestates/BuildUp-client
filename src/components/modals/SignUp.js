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
      <div id="modal-header">
        <span></span>
        <button onClick={props.handleModalToggle}>X</button>
      </div>
      <div id="modal-section">
        <div>
          <span>Username</span>

          <input type="text" placeholder="username"></input>
        </div>
        <div>
          <span>Email</span>
          <input type="text" placeholder="E-mail"></input>
        </div>
        <div>
          <span>Confirm Email</span>
          <input type="text" placeholder="confirm E-mail"></input>
        </div>
        <div>
          <span>Password</span>
          <input type="password" placeholder="Password"></input>
        </div>
        <div>
          <span>confirm Password</span>
          <input type="password" placeholder="confirm Password"></input>

          <input type="text" onChange={handleInputValue("USERNAME")}></input>
        </div>
        <div>
          <span>Email</span>
          <input type="text" onChange={handleInputValue("EMAIL")}></input>
        </div>
        <div>
          <span>Confirm Email</span>
          <input type="text" onChange={handleInputValue("REEMAIL")}></input>
        </div>
        <div>
          <span>Password</span>
          <input
            type="password"
            onChange={handleInputValue("PASSWORD")}
          ></input>
        </div>
        <div>
          <span>Confirm Password</span>
          <input
            type="password"
            onChange={handleInputValue("REPASSWORD")}
          ></input>
        </div>
      </div>
      <div id="modal-footer">
        <button onClick={handleSignUp}>확인</button>
      </div>
    </div>
  );
}

export default SignUp;
