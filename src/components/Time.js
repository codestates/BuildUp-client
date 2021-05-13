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
  // const getHour = hour - 12;
  const min = today.getMinutes();
  const sec = today.getSeconds();

  const time = today.toLocaleTimeString({
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const wish = ` ${
    (hour < 12 && "좋은 오전 입니다. 상쾌한 하루를 시작해 보세요!") ||
    (hour < 17 && "식사는 맛있게 하셨나요? 오후도 보람차게 보내세요!") ||
    (hour < 22 && "하루 잘 마무리 하셨나요? 즐거운 저녁 되세요")
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
/*
  if (paramType === 'day') {
    unit = 1000 * 60 * 60 * 24; // 일 단위
  } else if (paramType === 'hour') {
    unit = 1000 * 60 * 60; // 시간
  } else if (paramType === 'minute') {
    unit = 1000 * 60; // 분
*/
