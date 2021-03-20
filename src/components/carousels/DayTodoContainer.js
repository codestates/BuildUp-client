import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";

function WeekPage() {
  return (
    <React.Fragment>
      {/* ! onDragOver: 드래그를 내렸을 때 발생하는 이벤트, Event.target은 덮어씌워진 Element(자신)  */}
      <ul onDragOver={_onDragOver}>
        {lists.map((val, index) => {
          let classNames = "";

          grab.move_up.includes(index) && (classNames = "move_up");
          grab.move_down.includes(index) && (classNames = "move_down");

          let move_stop = isDrag ? "" : "move_stop";

          return (
            <li
              key={index}
              data-order={index}
              data-content={val.content}
              data-createdat={val.createdAt}
              className={["dayTodoItem", classNames, move_stop].join(" ")}
              isdrag={isDrag ? 1 : 0}
              //! onDragStart: Element를 드래그하기 시작할 때
              onDragStart={_onDragStart}
              // ! onDragEnd: Element의 드래그를 끝낼 때
              onDragEnd={_onDragEnd}
              // ! onDragEnter: Draggable Element가 자신의 (event.target은 자신)범위 안으로 들어갔을 때
              onDragEnter={_onDragEnter}
              // ! onDragLeave: Draggable Element가 자신의 (event.target은 자신)범위 밖으로 나갔을 때
              onDragLeave={_onDragLeave}
              draggable
            >
              Primary Key값은 "{val.id}", 내용은 "{val.content}", order는 "
              {index}" 입니다.
            </li>
          );
        })}
      </ul>
    </React.Fragment>

  );
}

export default WeekPage;
