import React, { useEffect, useRef, useState } from "react";
import "../css/MainPage.css";

export default function BuildUpTime() {
  const locale = "ko";
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  React.useEffect(() => {
    const timer = setInterval(() => {
      //1 분마다 현재 데이터를 업데이트한다.
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(timer); // 마운트 해제시 호출되지 않도록 타이머를 지우는 기능
    };
  }, []);

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }`;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });

  return (
    <span className="time">
      <section>
        <article className="time-day-clock">
          {day} {time}
        </article>
        <article className="time-message">{wish}</article>
      </section>
    </span>
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
