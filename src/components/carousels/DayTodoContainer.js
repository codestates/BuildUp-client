import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-datyTodoContainer.css";
import { fetch_custom } from "../../utilities/index.js";
import { updateTodoList } from "../../actions/index";
import { format } from "date-fns";

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

const DayTodoItemList = (props) => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);

  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const accessTokenState = useSelector((state) => state.accessTokenReducer);
  const todoItems = todoItemsState.todoItems;
  const accessToken = accessTokenState.accessToken;

  useEffect(() => {
    let date = format(props.pos, "yyyy-MM-dd").split("-");
    const year = date[0].padStart(4, "0");
    const month = date[1].padStart(2, "0");
    const day = date[2].padStart(2, "0");

    const curPos = `${year}-${month}-${day}`;

    let max = 0;
    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) {
        if (max < el.order) max = el.order;
        return true;
      }
      return false;
    });

    sorted.sort((a, b) => a.order - b.order);

    setLists(sorted);
    props.handleMaxOrder(max);
  }, [todoItems, props]);

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
    handleUpdateListOrder(grab.updateList);

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

  const handleUpdateListOrder = (lists) => {
    // // TODO: List Order를 UPDATE하는 함수
    if (lists.length <= 0 && !lists) return;
    for (let idx = 0; idx < lists.length; idx++) {
      const storeIdx = todoItems.indexOf(lists[idx]);
      const item = todoItems[storeIdx];
      const { id, content, checked, order } = item;
      if (order === idx) continue;
      dispatch(updateTodoList({ id, content, checked, order: idx }));
      fetch_custom.updateTodo(accessToken, {
        id,
        content,
        isChecked: checked,
        order: idx,
      });
    }
  };

  const handleCheckboxEvent = (e) => {
    if (e.target.value !== "checkbox") return;
    const PK = Number(e.target.parentNode.dataset.key);
    let index;
    for (let i = 0; i < todoItems.length; i++) {
      const item = todoItems[i];
      if (item.id === PK) {
        index = i;
        break;
      }
    }
    const item = todoItems[index];
    let { id, content, checked, order } = item;
    checked === true ? (checked = false) : (checked = true);
    dispatch(updateTodoList({ id, content, order, checked }));
    fetch_custom.updateTodo(accessToken, {
      id,
      content,
      order,
      isChecked: checked,
    });

    // TODO: LIST에도 체크 여부를 전달해야 한다.
    let date = format(props.pos, "yyyy-MM-dd").split("-");
    const year = date[0].padStart(4, "0");
    const month = date[1].padStart(2, "0");
    const day = date[2].padStart(2, "0");
    const curPos = `${year}-${month}-${day}`;
    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) {
        return true;
      }
      return false;
    });
    setLists(sorted);
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
              key={val.id}
              data-key={val.id}
              data-order={index}
              data-content={val.content}
              data-date={val.date}
              className={[
                "dayTodoItem",
                classNames,
                move_stop,
                "cursor-move",
              ].join(" ")}
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
              <input
                type="checkbox"
                value="checkbox"
                onClick={handleCheckboxEvent}
                checked={val.checked}
              />
              &nbsp; {val.order}. {val.content} / PK: {val.id}.
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default DayTodoItemList;

// const _SocialNetworks = data.data;
