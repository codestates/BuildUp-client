import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  setModalType,
  setUserInfo,
  toggleLoginStatus,
  setAccessToken,
  getTodoList,
} from "../actions/index";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { fetch_custom, jwt_isExpired } from "../utilities/index";
import Carousel from "../components/Carousel";
import BuildUpTime from "../components/Time";
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
          if (jwt_isExpired(accessToken)) {
            let token = await fetch_custom.getAccessToken(accessToken);
            await dispatch(setAccessToken(token));
          }
          const items = await fetch_custom.getTodoInfo(accessToken);
          await dispatch(getTodoList(items));
        };
        loadItems();
      }
    }
  }, [isLogin, todoItems, accessToken, dispatch]);

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
    dispatch(setUserInfo("", ""));
    dispatch(toggleLoginStatus());
    dispatch(setAccessToken(""));
    dispatch(getTodoList([]));
  };

  return !isLogin ? (
    <div id="main-page-before">
      <header id="header">
        <div
          id="main-header-name"
          className="main-header-name"
          onClick={handleRedirectToMain}
        >
          <span>Buildup</span>
        </div>
        <div id="button-box" className="button-box">
          <button
            onClick={() => {
              handleModalToggle();
              handleModalType("SIGNUP");
            }}
            className="main-btn main-signup-btn"
          >
            회원가입
          </button>

          <button
            onClick={() => {
              handleModalToggle();
              handleModalType("LOGIN");
            }}
            className="main-btn main-login-btn"
          >
            로그인
          </button>
        </div>
      </header>
      <section>
        <article id="top-h"></article>
        <article id="welcome-box" className="welcome-text-box">
          <h3 className="welcome-text">환영합니다</h3>
        </article>
        {/* <div id="btn-demo-box" className="btn-demo-box">
          <button className="btn-demo">체험해보기</button>
        </div> */}
        <article id="main-clock">
          <BuildUpTime />
        </article>
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
        <div
          id="main-header-name"
          className="main-header-name"
          onClick={handleRedirectToMain}
        >
          <span>Buildup</span>
        </div>
        <div id="button-box" className="button-box">
          <button
            onClick={handleRedirectProfile}
            className="main-btn main-profile-btn"
          >
            프로필
          </button>
          <button onClick={handleLogout} className="main-btn main-logout-btn">
            로그아웃
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
