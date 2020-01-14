import React from "react";

export default function MonthlyCardCell(props) {
  return (
    <div
      className={props.cell_class_list}
      key={props.cell_key}
      id={props.cell_key}
    >
      {props.closeEvent ? (
        <i className="fas fa-times" onClick={props.closeEvent}></i>
      ) : null}
      <div className="day_cell_info">{props.day_info}</div>
      <div className="day_cell_task_container">{props.day_tasks}</div>
    </div>
  );
}
