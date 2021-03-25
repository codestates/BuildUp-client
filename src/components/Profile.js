import { useHistory } from "react-router";
import { useSelector } from "react-redux";

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
    <div id="profile-container" className="profile-container">
      <div className="profile-header-box">
        <header className="profile-header-nav">
          <nav
            id="profile-title-name"
            className="profile-title-name profile-title inbox"
            onClick={handleRedirectProfile}
          >
            <h2 className="active font-color">프로필</h2>
          </nav>
          <nav
            id="profile-title-pwchange"
            className="profile-title-pwchange profile-title outbox"
            onClick={handleRedirectPassword}
          >
            <h2 className="inactive font-color">비밀번호 변경</h2>
          </nav>
        </header>
      </div>

      <section id="profile-section-a" className="profile-section-same">
        <div>
          <article id="profile-label-box">
            <label className="profile-label-name">Display Username</label>
          </article>
          <article id="profile-info-box">
            <span className="profile-info-name">{userInfo.username}</span>
          </article>
        </div>
        <article>
          <div id="profile-label-box">
            <label className="profile-label-name">Display Email</label>
          </div>
          <div id="profile-info-box">
            <span className="profile-info-name">{userInfo.email}</span>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Profile;
