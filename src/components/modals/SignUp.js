import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";

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
        <div id="modal-header-signup" className="disable-select">
          <h2 className={"active lineHover"}>Sign up</h2>
          <h2 className="inactive lineHover" onClick={props.handleModalType}>
            Login in
          </h2>
        </div>
        <div id="modal-section">
          <div id="section-signup">
            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="icon"
                aria-hidden="true"
              />

              <input
                className="input-field"
                type="text"
                name="username"
                onChange={handleInputValue("USERNAME")}
                placeholder="Your username"
              />
            </div>
            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon" />

              <input
                className="input-field"
                type="text"
                name="Email"
                onChange={handleInputValue("EMAIL")}
                placeholder="Your Email"
              />
            </div>

            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="icon" />

              <input
                className="input-field"
                type="text"
                name="confirm Email"
                onChange={handleInputValue("REEMAIL")}
                placeholder="Confirm Email"
              />
            </div>
            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faUnlockAlt} size="2x" className="icon" />
              <input
                className="input-field"
                type="password"
                name="pwd"
                onChange={handleInputValue("PASSWORD")}
                placeholder="Password"
              />
            </div>
            <div className="input-icons input-icon-bg">
              <FontAwesomeIcon icon={faUnlockAlt} size="2x" className="icon" />
              <input
                className="input-field"
                type="password"
                name="pwd"
                onChange={handleInputValue("REPASSWORD")}
                placeholder="Confirm Password"
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
