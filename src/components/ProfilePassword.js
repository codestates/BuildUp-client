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
    <div id="profile-container" className="profile-container">
      <header className="profile-header-box">
        <section className="profile-header-nav">
          <nav
            id="profile-title-name"
            className="profile-title-name profile-title outbox"
            onClick={handleRedirectProfile}
          >
            <h2 className="inactive font-color">프로필</h2>
          </nav>
          <nav
            id="profile-title-pwchange"
            className="profile-title-pwchange profile-title inbox"
            onClick={handleRedirectPassword}
          >
            <h2 className="active font-color">비밀번호 변경</h2>
          </nav>
        </section>
      </header>

      <section id="profile-section-b" className="profile-section-same">
        <div id="change-password-box">
          <article>
            <label for="before-pwd" className="change-pwd-font">
              현재 비밀번호
            </label>
            <br></br>
            <input
              type="password"
              name="before-pwd"
              placeholder="현재 비밀번호"
              className="profile-pwd this-pwd"
            />
          </article>

          <article>
            <label for="new-pwd" className="change-pwd-font">
              새로운 비밀번호
            </label>
            <br></br>
            <input
              type="password"
              name="new-pwd"
              placeholder="세로운 비밀번호"
              className="profile-pwd change-pwd"
            />
          </article>

          <article>
            <label for="chk-new-pwd" className="change-pwd-font">
              새로운 비밀번호 확인
            </label>
            <br></br>
            <input
              type="password"
              name="chk-new-pwd"
              placeholder="새로운 비밀번호 확인"
              className="profile-pwd confirm-pwd"
            />
          </article>
        </div>
        <footer id="profile-footer">
          <div id="footer-btn-box" className="footer-btn-box">
            <div className="pwd-change-btn-box">
              <button
                onClick={handleChangePassword}
                className="pwd-change-btn footer-btn-font"
              >
                비밀번호 변경
              </button>
            </div>
            <div className="pwd-change-btn-box">
              <button
                onClick={handleRedirectProfile}
                className="pwd-change-btn footer-btn-font"
              >
                취소
              </button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default ProfilePassword;
