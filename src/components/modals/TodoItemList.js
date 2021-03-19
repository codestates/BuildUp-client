const { useState, useEffect } = require("react");
const _SocialNetWork = [
  { title: "Twitter", color: "white", backgroundColor: "Red" },
  { title: "Facebook", color: "black", backgroundColor: "Orange" },
  { title: "Line", color: "black", backgroundColor: "Yellow" },
  { title: "Instagram", color: "white", backgroundColor: "Green" },
  { title: "Telegram", color: "white", backgroundColor: "Blue" },
  { title: "KaKao", color: "white", backgroundColor: "DarkBlue" },
  { title: "LinkedIn", color: "white", backgroundColor: "Purple" },
];

const _initGrabData = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

function TodoItemList() {
  const [lists, setLists] = useState(_SocialNetWork);
  const [grab, setGrab] = useState(_initGrabData);
  const [isDrag, setIsDrag] = useState(false);

  const _onDragOver = (e) => {
    // ! preventDefault는 event의 고유동작을 중지시킨다.
    // ! stopPropagation은 이벤트가 상위 엘리멘트에 전파되지 않도록 한다.
    e.preventDefault();
  };

  const _onDragStart = (e) => {
    setIsDrag(true);
    setGrab({
      ...grab,
      target: e.target,
      // ! HTMLElement.dataset은 HTML 태그 속성에 data-{key}으로 저장한 값을 읽을 수 있다.
      // ! e.target.dataset.order ---> data-order="..."
      position: Number(e.target.dataset.order),
      updateList: [...lists],
    });

    e.target.classList.add("grabbing");
  };
}
