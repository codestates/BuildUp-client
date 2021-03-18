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

  return (
    <div id="profile-container">
      <div>
        <span>현재 비밀번호</span>
        <input type="password" placeholder="내용을 입력하세요"></input>
      </div>
      <div>
        <span>새로운 비밀번호</span>
        <input type="password" placeholder="내용을 입력하세요"></input>
      </div>
      <div>
        <span>새로운 비밀번호 확인</span>
        <input type="password" placeholder="내용을 입력하세요"></input>
      </div>
      <div>
        <button onClick={handleChangePassword}>비밀번호 변경</button>
        <button onClick={handleRedirectProfile}>취소</button>
      </div>
    </div>
  );
}

export default ProfilePassword;
