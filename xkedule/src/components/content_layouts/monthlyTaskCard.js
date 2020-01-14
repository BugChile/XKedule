import React from "react";

export default function MonthlyTaskCard(props) {
  const card_id = props.event.id.concat("_event_monthly_card");
  var className = "task_card monthly_task_card";
  if (props.className) {
    className += " " + props.className;
  }
  return (
    <span
      className={className}
      key={card_id}
      id={card_id}
      onClick={() => props.clickEvent(props.event, card_id)}
    >
      <div className="task_title">{props.event.title}</div>
    </span>
  );
}
