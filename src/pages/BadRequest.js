import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  setModalType,
  setUserInfo,
  toggleLoginStatus,
  setAccessToken,
  setRefreshToken,
} from "../actions/index";
import { useHistory } from "react-router";
import Carousel from "../components/Carousel";
require("dotenv").config();

export default function BadRequest() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirectToMain = () => {
    history.push("/");
  };

  return (
    <div id="main-page-before">
      <header id="header">
        <div id="header-name" onClick={handleRedirectToMain}>
          <span>Buildup</span>
        </div>
      </header>
      <section>
        <div id="top-h"></div>
        <div id="welcome-box">
          <h3 className="welcome-text">Bad Request</h3>
        </div>
        <div id="top-l"></div>
      </section>
      <footer>
        <div></div>
      </footer>
      <div className="bg-image"></div>
    </div>
  );
}
