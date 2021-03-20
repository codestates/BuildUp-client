import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";
import DayTodoItemList from "./DayTodoContainer";

function DayPage() {
  return (
    <section id="day-container">
      <div id="day-main">
        <span id="day-title">03. 16. TUE DAY</span>
      </div>
      <div id="day-button-container">
        <button className="day-btn-add-todo">새로운 TODO 추가하기</button>
      </div>
      <div id="day-todo-container">
        <DayTodoItemList />
      </div>
    </section>
  );
}

export default DayPage;
