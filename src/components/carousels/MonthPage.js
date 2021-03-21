import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthCalendar from "./MonthCalendar";
import "../temporary-CSS-for-Carousel.css";

function MonthPage() {
  return (
    <section id="month-container">
      <div id="month-main">
        <span id="month-title">03. 16. TUE MONTH입니다 MONTH</span>
      </div>
      <MonthCalendar />
    </section>
  );
}

export default MonthPage;
