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

const _initGrabState = {
  target: null,
  position: null,
  move_up: [],
  move_down: [],
  updateList: [],
};

function TodoItemList() {
  const [lists, setLists] = useState(_SocialNetWork);
  const [grab, setGrab] = useState(_initGrabState);
  const [isDrag, setIsDrag] = useState(false);

  const handleDragOver = (e) => {
    // ! preventDefault는 event의 고유동작을 중지시킨다.
    // ! stopPropagation은 이벤트가 상위 엘리멘트에 전파되지 않도록 한다.
    e.preventDefault();
  };

  const handleDragStart = (e) => {
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
    // ! setData는 드래그 작업의 DATA을 지정한 데이터/유형으로 설정.
    // ! effectAllowed는 드래그 작업에 허용되는 효과를 지정합니다(move: 항목을 새 위치로 이동)
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("texthtml", e.target);
  };

  const handleDragEnd = (e) => {
    setIsDrag(false);
    e.target.classList.remove("grabbling");
    // ! dropEffect는 드래그 조작 효과를 설정합니다(move: 항목을 새 위치로 이동)
    e.dataTransfer.dropEffect = "move";

    setLists([...grab.updateList]);

    setGrab({
      target: null,
      move_up: [],
      move_down: [],
      updateList: [],
    });

    // ? style.visibility = "visible" / "none"
    e.target.style.visibility = "visible";
  };

  const handleDragEnter = (e) => {
    // TODO 순서를 바꾸는 로직
    let grabPos = Number(grab.target.dataset.order);
    let listPos = grab.order;
    let targetPos = Number(e.target.dataset.order);

    let [move_up, move_down, data] = [
      ...grab.move_up,
      ...grab.move_down,
      ...grab.updateList,
    ];

    data[listPos] = data.splcie(targetPos, 1, data[listPos])[0];

    if (grabPos > targetPos)
      move_down.includes(targetPos)
        ? move_down.pop()
        : move_down.push(targetPos);
    else if (grabPos < targetPos)
      move_up.includes(targetPos) ? move_up.pop() : move_up.push(targetPos);
    else [move_down, move_up] = [[], []];

    setGrab({
      ...grab,
      move_up,
      move_down,
      updateList: data,
      position: targetPos,
    });
  };

  const handleDragLeave = (e) => {
    if (e.target === grab.target) e.target.style.visibility = "hidden";
  };
}
