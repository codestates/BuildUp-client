import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./temporary-CSS-datyTodoContainer.css";
import { js_date } from "../../utilities/index.js";

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

const DayTodoItemList = (props) => {
  // const [lists, setLists] = useState([_SocialNetworks]);
  const [lists, setLists] = useState([]);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);
  const [time, setTime] = useState(props.pos);

  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const todoItems = todoItemsState.todoItems;

  useEffect(() => {
    const [year, month, day] = [
      js_date.getYear(time),
      js_date.getMonth(time),
      js_date.getDay(time),
    ];
    const curPos = `${year}-${month}-${day}`;

    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) return true;
      return false;
    });

    setLists(sorted);
  }, [time, todoItems]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
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

  const handleDragEnd = (e) => {
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

  const handleDragEnter = (e) => {
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
  const handleDragLeave = (e) => {
    if (!isDrag) return;
    if (e.target === grab.target) {
      e.target.style.visibility = "hidden";
    }
  };

  return (
    <React.Fragment>
      {/* ! onDragOver: 드래그를 내렸을 때 발생하는 이벤트, Event.target은 덮어씌워진 Element(자신)  */}
      <ul className="day-todo-container-ul" onDragOver={handleDragOver}>
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
              data-date={val.date}
              className={["dayTodoItem", classNames, move_stop].join(" ")}
              isdrag={isDrag ? 1 : 0}
              //! onDragStart: Element를 드래그하기 시작할 때
              onDragStart={handleDragStart}
              // ! onDragEnd: Element의 드래그를 끝낼 때
              onDragEnd={handleDragEnd}
              // ! onDragEnter: Draggable Element가 자신의 (event.target은 자신)범위 안으로 들어갔을 때
              onDragEnter={handleDragEnter}
              // ! onDragLeave: Draggable Element가 자신의 (event.target은 자신)범위 밖으로 나갔을 때
              onDragLeave={handleDragLeave}
              draggable
            >
              <input type="checkbox" />
              Order:"{index}", Primary Key "{val.id}", "{val.content}".
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default DayTodoItemList;

// const _SocialNetworks = data.data;
