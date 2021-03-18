import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MainPage() {
  return (
    <div id="main-page">
      <header id="header">
        <div id="header-name">
          <h1>Build Up</h1>
        </div>
        <div id="button-box">
          <button>Login</button>
          <button>Join</button>
        </div>
      </header>
      <section>
        <div id="top-h"></div>
        <div id="welcome-box">
          <h1 className="welcome-text">환영합니다.</h1>
        </div>
        <div id="btn-beta-box">
          <button className="btn-beta">
            <p>체험해보기</p>
          </button>
        </div>
        <div id="top-l"></div>
      </section>
      <footer>
        <div>dd</div>
      </footer>
    </div>
  );
}
