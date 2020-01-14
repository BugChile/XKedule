import React from "react";

export default function WeeklyTaskCard(props) {
  const card_id = props.event.id.concat("_event_weekly_card");
  return (
    <span
      className="task_card weekly_task_card"
      key={card_id}
      id={card_id}
      onClick={() => props.clickEvent(props.event, card_id)}
    >
      <div className="task_title">{props.event.title}</div>
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
