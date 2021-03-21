import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";

function MonthPage() {
  return (
    <section id="day-container">
      <div id="day-main">
        <span id="day-title">03. 16. TUE MONTH입니다 MONTH</span>
      </div>
      <div id="day-button-container">
        <button className="day-btn-add-todo">새로운 TODO 추가하기</button>
      </div>
      <div id="day-todo-container">
        <li key="1" order="1">
          <button>X</button>
          <span>오늘 나는 잠을 잘 잤다.</span>
        </li>
        <li key="2" order="2">
          <button>X</button>
          <span>오늘 나는 잠을 잘 잤다.</span>
        </li>
        <li key="3" order="3">
          <button>X</button>
          <span>오늘 나는 잠을 잘 잤다.</span>
        </li>
        <li key="4" order="4">
          <button>X</button>
          <span>오늘 나는 잠을 잘 잤다.</span>
        </li>
      </div>
    </section>
  );
}

export default MonthPage;
