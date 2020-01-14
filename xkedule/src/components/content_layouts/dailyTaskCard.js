import React from "react";

const getGridPlacement = (event, span) => {
  var grid_start =
    Math.floor(
      (event.date_start.getHours() * 60 + event.date_start.getMinutes()) / 2
    ) + 1;
  var grid_end =
    Math.floor(
      (event.date_end.getHours() * 60 + event.date_end.getMinutes()) / 2
    ) + 1;
  return { gridRow: grid_start + "/" + grid_end, gridColumn: "span " + span };
};

export default function DailyTaskCard(props) {
  const card_id = props.event.id.concat("_event_daily_card");
  return (
    <span
      className="task_card daily_task_card"
      key={card_id}
      id={card_id}
      style={getGridPlacement(props.event, props.column_span)}
      title={props.event.title}
      onClick={() => props.clickEvent(props.event, card_id)}
    >
      <div className="task_title">
        <div className="centered_container">
          <span className="overflow_text">{props.event.title}</span>
        </div>
      </div>
      <div className="task_date">
        {props.event.date_start.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        })}
        <span> - </span>
        {props.event.date_end.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </div>
    </span>
  );
}
