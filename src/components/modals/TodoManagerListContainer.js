import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-todoManager.css";
import {
  deleteTodoList,
  updateTodoList,
  setAccessToken,
} from "../../actions/index";
import { fetch_custom, jwt_isExpired } from "../../utilities/index";

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

const TodoManagerListContainer = (props) => {
  const dispatch = useDispatch();
  const [lists, setLists] = useState([]);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [editText, setEditText] = useState("");

  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const accessTokenState = useSelector((state) => state.accessTokenReducer);
  const { dateSelector } = dateSelectorState;
  const todoItems = todoItemsState.todoItems;
  const accessToken = accessTokenState.accessToken;

  useEffect(() => {
    const year = `${dateSelector.year}`.padStart(4, "0");
    const month = `${dateSelector.month}`.padStart(2, "0");
    const day = `${dateSelector.day}`.padStart(2, "0");

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
  }, [todoItems, dateSelector, props]);

  const handleDragOver = (e) => {
    if (e.target.value === "checkbox") return;
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    if (e.target.value === "checkbox") return;
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
    if (e.target.value === "checkbox") return;
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
    if (e.target.className.includes("notTarget")) return;
    if (e.target.value === "checkbox") return;
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
    if (e.target.className.includes("notTarget")) return;
    if (e.target.value === "checkbox") return;
    if (!isDrag) return;
    if (e.target === grab.target) {
      e.target.style.visibility = "hidden";
    }
  };

  const handleUpdateListOrder = async (lists) => {
    if (lists.length <= 0 && lists) return;

    for (let idx = 0; idx < lists.length; idx++) {
      const storeIdx = todoItems.indexOf(lists[idx]);
      const item = todoItems[storeIdx];
      const { id, content, checked, order } = item;
      if (order === idx) continue;

      // if (jwt_isExpired(accessToken)) {
      //   console.log("토큰 재발급을 시작합니다.....!");
      //   let token = await fetch_custom.getAccessToken(accessToken);
      //   await dispatch(setAccessToken(token));
      // }

      dispatch(updateTodoList({ id, content, checked, order: idx }));
      fetch_custom.updateTodo(accessToken, {
        id,
        content,
        isChecked: checked,
        order: idx,
      });
    }
  };

  const handleUpdateTextarea = (e) => {
    setEditText(e.target.value);
  };

  const handleDeleteTodo = async (PK) => {
    // if (jwt_isExpired(accessToken)) {
    //   let token = await fetch_custom.getAccessToken(accessToken);
    //   await dispatch(setAccessToken(token));
    // }

    dispatch(deleteTodoList({ id: PK }));
    fetch_custom.removeTodo(accessToken, { id: PK });

    // TODO: LIST에도 체크 여부를 전달해야 한다.
    const year = `${dateSelector.year}`.padStart(4, "0");
    const month = `${dateSelector.month}`.padStart(2, "0");
    const day = `${dateSelector.day}`.padStart(2, "0");

    const curPos = `${year}-${month}-${day}`;

    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) {
        return true;
      }
      return false;
    });

    setLists(sorted);
  };

  const handleCheckboxEvent = async (PK) => {
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

    // if (jwt_isExpired(accessToken)) {
    //   let token = await fetch_custom.getAccessToken(accessToken);
    //   await dispatch(setAccessToken(token));
    // }

    dispatch(updateTodoList({ id, content, order, checked }));
    fetch_custom.updateTodo(accessToken, {
      id,
      content,
      order,
      isChecked: checked,
    });

    // TODO: LIST에도 체크 여부를 전달해야 한다.
    const year = `${dateSelector.year}`.padStart(4, "0");
    const month = `${dateSelector.month}`.padStart(2, "0");
    const day = `${dateSelector.day}`.padStart(2, "0");

    const curPos = `${year}-${month}-${day}`;

    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) {
        return true;
      }
      return false;
    });

    setLists(sorted);
  };

  const handleEditText = (key) => {
    setEditKey(key);
  };

  const handleEditTextConfirm = async (PK) => {
    if (editText.length === 0) return;
    let index;

    for (let i = 0; i < todoItems.length; i++) {
      const item = todoItems[i];
      if (item.id === PK) {
        index = i;
        break;
      }
    }

    const item = todoItems[index];
    let { id, checked, order } = item;

    // if (jwt_isExpired(accessToken)) {
    //   let token = await fetch_custom.getAccessToken(accessToken);
    //   await dispatch(setAccessToken(token));
    // }

    dispatch(updateTodoList({ id, content: editText, order, checked }));
    fetch_custom.updateTodo(accessToken, {
      id,
      content: editText,
      order,
      isChecked: checked,
    });

    // TODO: LIST에도 체크 여부를 전달해야 한다.
    const year = `${dateSelector.year}`.padStart(4, "0");
    const month = `${dateSelector.month}`.padStart(2, "0");
    const day = `${dateSelector.day}`.padStart(2, "0");

    const curPos = `${year}-${month}-${day}`;

    const sorted = todoItems.filter((el) => {
      if (el.date === curPos) {
        return true;
      }
      return false;
    });

    setLists(sorted);
    setEditText("");
    handleExitEditText();
  };

  const handleExitEditText = () => {
    setEditKey(null);
  };

  return (
    <ul id="todo-manager-container" onDragOver={handleDragOver}>
      {lists.map((val, index) => {
        let classNames = "";

        grab.move_up.includes(index) && (classNames = "move_up");
        grab.move_down.includes(index) && (classNames = "move_down");

        let move_stop = isDrag ? "" : "move_stop";

        return (
          <div
            key={val.id}
            data-key={val.id}
            data-order={index}
            data-content={val.content}
            data-date={val.date}
            className={[
              "todo-manager-item",
              classNames,
              move_stop,
              val.id,
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
            <div className={["button-container", "notTarget"].join(" ")}>
              <input
                type="checkbox"
                value="checkbox"
                onClick={() => {
                  handleCheckboxEvent(val.id);
                }}
                defaultChecked={val.checked}
              />
              <button
                className="notTarget"
                onClick={() => {
                  handleEditText(val.id);
                }}
              >
                편집
              </button>
              <button
                className="notTarget"
                onClick={() => {
                  handleDeleteTodo(val.id);
                }}
              >
                삭제
              </button>
            </div>
            <div className={["text-container", "notTarget"].join(" ")}>
              {editKey === val.id ? (
                <span className="notTarget">
                  <textarea
                    maxLength="100"
                    className={["notTarget", val.id, "textarea"].join(" ")}
                    onChange={handleUpdateTextarea}
                  >
                    {val.content}
                  </textarea>
                  <button
                    className="notTarget"
                    onClick={() => {
                      handleEditTextConfirm(val.id);
                    }}
                  >
                    확인
                  </button>
                  <button className="notTarget" onClick={handleExitEditText}>
                    취소
                  </button>
                </span>
              ) : (
                <>{val.content}</>
              )}
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default TodoManagerListContainer;
