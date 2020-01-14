import React from "react";

export default function DayMonth(props) {
  return (
    <div className={props.classCss} onClick={() => props.onClickDay(props.day)}>
      {props.day.getDate()}
    </div>
  );
}
