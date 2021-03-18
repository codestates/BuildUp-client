import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Login(props) {
  return (
    <div id="modal-login">
      <div id="modal-header">
        <div id="modal-header-login">
          <h4>로그인 페이지</h4>

          <button
            onClick={props.handleModalToggle}
            className="modal-login-close"
          >
            &times;
          </button>
        </div>
        <div id="modal-section">
          <div>
            <input type="text" className="loginId" placeholder="username" />
          </div>
          <div>
            <input type="password" className="loginPw" placeholder="password" />
          </div>
          <div>
            <label>자동 로그인</label>
            <input type="checkbox"></input>
          </div>
        </div>
        <div id="modal-footer">
          <button className="login-btn">로그인</button>
        </div>
        <div id="social-box">
          <button>GitHub</button>
          <button>Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
