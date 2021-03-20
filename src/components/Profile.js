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
  const handleRedirectProfile = () => {
    history.push("/profile");
  };

  return (
    <div id="profile-container">
      <div className="profile-header-profile">
        <div className="profile-header-btn">
          <div
            id="profile-title-name"
            className="profile-title-name profile-title"
            onClick={handleRedirectProfile}
          >
            <h2>Profile</h2>
          </div>
          <div
            id="profile-pwchange-btn"
            className="profile-pwchange-btn profile-title"
            onClick={handleRedirectPassword}
          >
            <h2>Change Password</h2>
          </div>
        </div>
      </div>
      <div id="profile-body">
        <section id="profile-section-a">
          <div>
            <div id="profile-label-box">
              <label className="profile-label-name">Display Username</label>
            </div>
            <div id="profile-info-box">
              <span className="profile-info-name">{userInfo.username}</span>
            </div>
          </div>
          <div>
            <div id="profile-label-box">
              <label className="profile-label-name">Display Email</label>
            </div>
            <div id="profile-info-box">
              <span className="profile-info-name">{userInfo.email}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
