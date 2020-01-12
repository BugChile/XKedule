import React from "react";

export default function dayMonth(props) {
  return (
    <div className={props.classCss} onClick={() => props.onClickDay(props.day)}>
      {props.day.getDate()}
    </div>
  );
}
