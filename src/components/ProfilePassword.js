import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function ProfilePassword() {
  const history = useHistory();

  const handleChangePassword = () => {
    // 1. 타당성 검사 옳으면 다음단계 아니면 잘못된 부분 표시
    // 2. 비밀번호가 일치하지 않을경우 일치하지 않는다는 메시지 표시(현재 비밀번호, 바꿀 비밀번호 나누어서)

    // 3. 서버에 새로운 비밀번호 업데이트

    // 4. 비밀번호 바뀌었으면, Redirect
    handleRedirectProfile();
    // 5. 화면에 안내 모달창 띄울 것.
  };
  const handleRedirectProfile = () => {
    history.push("/profile");
  };

  const handleRedirectPassword = () => {
    history.push("/profile/password");
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
        <section id="profile-section-b">
          <div>
            <span>현재 비밀번호</span>
          </div>
          <div>
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="profile-pwd this-pwd"
            />
          </div>

          <div>
            <span>새로운 비밀번호</span>
          </div>
          <div>
            <input
              type="password"
              placeholder="세로운 비밀번호"
              className="profile-pwd change-pwd"
            />
          </div>

          <div>
            <span>새로운 비밀번호 확인</span>
          </div>
          <div>
            <input
              type="password"
              placeholder="새로운 비밀번호 확인"
              className="profile-pwd confirm-pwd"
            />
          </div>
        </section>
      </div>
      <footer id="profile-footer">
        <div className="pwd-change-btn-box">
          <button onClick={handleChangePassword} className="pwd-change-btn">
            비밀번호 변경
          </button>
        </div>
        <div className="pwd-change-btn-box">
          <button onClick={handleRedirectProfile} className="pwd-change-btn">
            취소
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ProfilePassword;
