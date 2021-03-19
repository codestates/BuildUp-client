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

// <div class="carousel-child">
//   <section id="day-container">
//     <div id="day-main">
//       <span id="day-title">03. 16. TUE</span>
//     </div>
//     <div id="day-button-container">
//       <button className="day-btn-add-todo">새로운 TODO 추가하기</button>
//     </div>
//     <div id="day-todo-container">
//       <li key="1" order="1">
//         <button>X</button>
//         <span>오늘 나는 잠을 잘 잤다.</span>
//       </li>
//       <li key="2" order="2">
//         <button>X</button>
//         <span>오늘 나는 잠을 잘 잤다.</span>
//       </li>
//       <li key="3" order="3">
//         <button>X</button>
//         <span>오늘 나는 잠을 잘 잤다.</span>
//       </li>
//       <li key="4" order="4">
//         <button>X</button>
//         <span>오늘 나는 잠을 잘 잤다.</span>
//       </li>
//     </div>
//   </section>
// </div>
