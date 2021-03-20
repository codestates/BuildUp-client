import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";

function WeekTodoSubContainer(props) {
  const [pos, setPos] = useState(props.pos);

  return (
    <div className="week-todo-subcontainer" key="1">
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
  );
}

export default WeekTodoSubContainer;
