import React, { useState, useEffect } from "react";
import "./temporary-CSS-datyTodoContainer.css";

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

const DayTodoItemList = () => {
  const [lists, setLists] = useState(_SocialNetworks);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);

  // useEffect(() => {
  // }, [grab]);

  const _onDragOver = (e) => {
    e.preventDefault();
  };

  const _onDragStart = (e) => {
    // ! HTML Element의 커스텀 속성은 e.target.{props}로 얻을 수 없다.
    // ! getAttribute 사용해야함. dataset은 그럴 필요가 없다. 이걸 쓰도록...
    setIsDrag(true);
    setGrab({
      ...grab,
      target: e.target,
      position: Number(e.target.dataset.order),
      updateList: [...lists],
    });

    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const _onDragEnd = (e) => {
    setIsDrag(false);
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";

    setLists([...grab.updateList]);

    setGrab({
      target: null,
      move_up: [],
      move_down: [],
      updateList: [],
    });

    e.target.style.visibility = "visible";
  };

  const _onDragEnter = (e) => {
    if (!isDrag) return;
    let grabPosition = Number(grab.target.dataset.order);
    let listPosition = grab.position;
    let targetPosition = Number(e.target.dataset.order);

    let move_up = [...grab.move_up];
    let move_down = [...grab.move_down];

    let data = [...grab.updateList];
    data[listPosition] = data.splice(targetPosition, 1, data[listPosition])[0];

    if (grabPosition > targetPosition) {
      move_down.includes(targetPosition)
        ? move_down.pop()
        : move_down.push(targetPosition);
    } else if (grabPosition < targetPosition) {
      move_up.includes(targetPosition)
        ? move_up.pop()
        : move_up.push(targetPosition);
    } else {
      move_down = [];
      move_up = [];
    }

    setGrab({
      ...grab,
      move_up,
      move_down,
      updateList: data,
      position: targetPosition,
    });
  };
  const _onDragLeave = (e) => {
    if (!isDrag) return;
    if (e.target === grab.target) {
      e.target.style.visibility = "hidden";
    }
  };

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
};

export default DayTodoItemList;

const _SocialNetworks = [
  {
    id: 1,
    content: "배고프다.",
    createdAt: "8/18/2020",
    order: 1,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 2,
    content: "의미없다",
    createdAt: "7/26/2020",
    order: 2,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 3,
    content: "졸린데",
    createdAt: "9/21/2020",
    order: 3,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 4,
    content: "우우우우",
    createdAt: "11/26/2020",
    order: 4,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 5,
    content: "오오오오",
    createdAt: "4/24/2020",
    order: 5,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 6,
    content: "하이요",
    createdAt: "11/22/2020",
    order: 6,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 7,
    content: "바이요",
    createdAt: "3/29/2020",
    order: 7,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 8,
    content: "굿모닝",
    createdAt: "2/1/2021",
    order: 8,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 9,
    content: "굿잠",
    createdAt: "2/16/2021",
    order: 9,
    color: "black",
    backgroundColor: "none",
  },
  {
    id: 10,
    content: "수고요",
    createdAt: "9/9/2020",
    order: 10,
    color: "black",
    backgroundColor: "none",
  },
];
