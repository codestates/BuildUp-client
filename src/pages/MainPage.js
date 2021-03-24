import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  setModalType,
  setUserInfo,
  toggleLoginStatus,
  setAccessToken,
  setRefreshToken,
  getTodoList,
} from "../actions/index";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { fetch_custom } from "../utilities/index";
import Carousel from "../components/Carousel";
require("dotenv").config();

export default function MainPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const modalState = useSelector((state) => state.modalStateReducer);
  const loginState = useSelector((state) => state.loginStatusReducer);
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const accessTokenState = useSelector((state) => state.accessTokenReducer);
  const isModalOpen = modalState.modalStatus;
  const isLogin = loginState.loginStatus;
  const todoItems = todoItemsState.todoItems;
  const accessToken = accessTokenState.accessToken;

  useEffect(() => {
    console.log("MAINPAGE USEEFFECT가 작동하고 있습니다");
    if (isLogin) {
      if (todoItems.length === 0) {
        const loadItems = async () => {
          const items = await fetch_custom.getTodoInfo(accessToken);
          console.log(items);
          dispatch(getTodoList(items));
        };
        loadItems();
      } else {
        dispatch(setAccessToken(""));
        dispatch(getTodoList([]));
      }
    }
  }, [isLogin]);

  const handleRedirectProfile = () => {
    history.push("/profile");
  };

  const handleRedirectToMain = () => {
    history.push("/");
  };

  const handleModalToggle = () => {
    if (!isModalOpen) {
      dispatch(toggleModal());
    }
  };

  const handleModalType = (type) => {
    dispatch(setModalType(type));
  };

  const handleLogout = () => {
    dispatch(setUserInfo(null, null));
    dispatch(toggleLoginStatus());
    dispatch(setAccessToken(null));
    dispatch(setRefreshToken(null));
  };

  return !isLogin ? (
    <div id="main-page-before">
      <header id="header">
        <div id="header-name" onClick={handleRedirectToMain}>
          <span>Buildup</span>
        </div>
        <div id="button-box">
          <button
            onClick={() => {
              handleModalToggle();
              handleModalType("SIGNUP");
            }}
            className="main-btn main-signin-btn"
          >
            Join
          </button>

          <button
            onClick={() => {
              handleModalToggle();
              handleModalType("LOGIN");
            }}
            className="main-btn main-login-btn"
          >
            Login
          </button>
        </div>
      </header>
      <section>
        <div id="top-h"></div>
        <div id="welcome-box">
          <h3 className="welcome-text">환영합니다</h3>
        </div>
        {/* <div id="btn-demo-box" className="btn-demo-box">
          <button className="btn-demo">체험해보기</button>
        </div> */}
        <div id="top-l"></div>
      </section>
      <footer>
        <div></div>
      </footer>
      <div className="bg-image"></div>
    </div>
  ) : (
    <div id="main-page-after">
      <header id="header">
        <div id="header-name" onClick={handleRedirectToMain}>
          <span>Buildup</span>
        </div>
        <div id="button-box">
          <button onClick={handleLogout} className="main-btn main-logout-btn">
            Logout
          </button>
          <button
            onClick={handleRedirectProfile}
            className="main-btn main-mypage-btn"
          >
            Profile
          </button>
        </div>
      </header>
      <section>
        <Carousel />
      </section>
      <footer>
        <div></div>
      </footer>
      <div className="bg-image"></div>
    </div>
  );
}
