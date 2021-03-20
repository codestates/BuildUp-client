import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./temporary-CSS-todoManager.css";

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

const TodoManagerListContainer = () => {
  // const [lists, setLists] = useState([_SocialNetworks]);
  const [lists, setLists] = useState([]);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);

  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const { dateSelector } = dateSelectorState;
  const todoItems = todoItemsState.todoItems;

  useEffect(() => {
    const year = `${dateSelector.year}`.padStart(4, "0");
    const month = `${dateSelector.month}`.padStart(2, "0");
    const day = `${dateSelector.day}`.padStart(2, "0");

    const curPos = `${year}-${month}-${day}`;

    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) return true;
      return false;
    });
    setLists(sorted);
  }, [todoItems, dateSelector]);

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
    <ul id="todo-manager-container" onDragOver={_onDragOver}>
      {lists.map((val, index) => {
        let classNames = "";

        grab.move_up.includes(index) && (classNames = "move_up");
        grab.move_down.includes(index) && (classNames = "move_down");

        let move_stop = isDrag ? "" : "move_stop";

        return (
          <div
            key={index}
            data-order={index}
            data-content={val.content}
            data-date={val.date}
            className={["todo-manager-item", classNames, move_stop].join(" ")}
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
            <input type="checkbox"></input>
            Primary Key "{val.id}", "{val.content}".
          </div>
        );
      })}
    </ul>
  );
};

export default TodoManagerListContainer;

// const _SocialNetworks = data.data;
