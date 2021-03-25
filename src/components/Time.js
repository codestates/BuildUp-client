import React, { useEffect, useRef, useState } from "react";
import "../css/MainPage.css";

export default function BuildUpTime() {
  const locale = "ko";
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      //1 분마다 현재 데이터를 업데이트한다.
      setDate(new Date());
    }, (60 * 1000) / 1000);

    return () => {
      clearInterval(timer); // 마운트 해제시 호출되지 않도록 타이머를 지우는 기능
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${today.toLocaleDateString(locale, {
    month: "long",
  })} ${today.getDate()}일 ${day}`;

  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  const time = today.toLocaleTimeString({
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const wish = ` ${
    (time <= 12 && "대충 오전 아무말") ||
    (time <= 17 && "대충 오후 아무말") ||
    (time <= 20 && "대충 저녁 아무말") ||
    "대충 빨리 자라"
  }`;
  return (
    <div>
      <section className="time-zone">
        <article className="time-message">{wish}</article>
        <div className="time-box">
          <article className="time-clock">{time}</article>

          <article className="time-date"> {date} </article>
        </div>
      </section>
    </div>
  );
}
// let time = new Date().toLocaleTimeString();

// const [ntime, setNTime] = useState(time);

// const startTime = () => {
//   time = new Date().toLocaleTimeString();
//   setNTime(time);
// };

// setInterval(startTime, 1000);
// return <span className="time">{ntime}</span>;
