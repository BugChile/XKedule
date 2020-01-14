import React from "react";

export default function WeekCardDayHeaders(props) {
  return (
    <div
      className={"hover ".concat(props.day_cell_class)}
      key={props.card_key}
      onClick={() => props.onClickDay(props.day)}
    >
      <div className="day_name">{props.day_name}</div>
      <div className="day_date">{props.day_date}</div>
    </div>
  );
}
