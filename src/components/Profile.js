import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const history = useHistory();
  const loginState = useSelector((state) => state.loginStatusReducer);
  const userInfoState = useSelector((state) => state.userInfoReducer);
  const { isLogin } = loginState;
  const { userInfo } = userInfoState;

  const handleRedirectPassword = () => {
    history.push("/profile/password");
  };

  return (
    <div id="profile-container">
      <div>
        <span>아이디</span>
        <span>{userInfo.username}</span>
      </div>
      <div>
        <span>이메일</span>
        <span>{userInfo.email}</span>
      </div>
      <div>
        <span>비밀번호</span>
        <button onClick={handleRedirectPassword}>비밀번호 변경</button>
      </div>
    </div>
  );
}

export default Profile;
