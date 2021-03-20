import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";

function WeekPage() {
  return (
    <section id="week-container">
      <div id="week-main">
        <span id="week-title">03. 14 - 03. 20 WEEK</span>
      </div>
      <div id="week-todo-container">
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/14 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/15 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/16 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/17 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/18 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/19 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
        <div className="week-todo-subcontainer" key="date">
          <div className="week-todo-subtitle">03/20 SUN</div>
          <li key="1" order="1">
            오늘 할일은 뭘까
          </li>
          <li key="2" order="2">
            오늘 할일은 뭘까
          </li>
          <li key="3" order="3">
            오늘 할일은 뭘까
          </li>
          <li key="4" order="4">
            오늘 할일은 뭘까
          </li>
        </div>
      </div>
    </section>
  );
}

export default WeekPage;
