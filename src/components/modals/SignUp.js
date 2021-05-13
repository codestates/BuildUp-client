import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalType } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  isValidEmail,
  isValidPassword,
  isValidID,
} from "../../utilities/index";

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
  const [alert, setAlert] = useState("");

  const handleInputValue = (key) => (e) => {
    if (key === "USERNAME") setUsername(e.target.value);
    else if (key === "EMAIL") setEmail(e.target.value);
    else if (key === "REEMAIL") setReEmail(e.target.value);
    else if (key === "PASSWORD") setPassword(e.target.value);
    else if (key === "REPASSWORD") setRePassword(e.target.value);
  };

  const handleSignUp = () => {
    // TODO 빈 곳 있는지 확인
    if (!username || !email || !reEmail || !password || !rePassword) {
      setAlert("모든 항목을 입력해야 합니다.");
      return;
    }
    // TODO 비밀번호 / 이메일주소 일치여부 확인
    if (email !== reEmail || password !== rePassword) {
      setAlert("이메일 주소 또는 비밀번호가 일치하지 않습니다.");
      return;
    }
    // TODO 아이디, 이메일, 비밀번호 유효성 검사

    // !아이디는 대소문자 구분없이 영문 + 숫자로 작성해야 합니다.
    // ! 아이디는 5자 이상, 15자 이하여야 합니다.

    // ! 비밀번호는 8자 이상, 20자 이하로 작성해야 합니다.
    // ! 비밀번호는 특수문자(공백, 줄바꿈 포함)이 없어야합니다.
    // ! 비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.

    if (!isValidID(username)) {
      setAlert("아이디는 영문과 숫자로 5~15자로 작성해야 합니다.");
      return;
    }

    if (!isValidEmail(email)) {
      setAlert("유효하지 않은 이메일 주소입니다.");
      return;
    }

    if (!isValidPassword(password)) {
      setAlert("비밀번호는 영문, 숫자, 특수문자로 8~20자로 작성해야 합니다.");
      return;
    }

    // TODO Send Request
    axios
      .post(`${scheme}://${host}:${port}/user/signup`, {
        username,
        email,
        password,
      })
      .then((data) => {
        // TODO 계정 중복여부 확인
        if (
          data.status === 200 &&
          data.data === "이미 존재하는 이메일 입니다."
        ) {
          setAlert("이미 가입한 이메일 주소입니다.");
          return;
        }
        dispatch(setModalType("LOGIN"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="modal-signup">
      <div id="modal-signup-box">
        <div id="modal-header-signup" className="disable-select">
          <h2 className="active authOption">Sign up</h2>
          <h2 className="inactive authOption" onClick={props.handleModalType}>
            Sign in
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
          <div id="alert">{alert}</div>
          <button onClick={handleSignUp}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
