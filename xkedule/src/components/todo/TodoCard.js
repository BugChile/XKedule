import React from "react";
import { monthsShortName } from "../../js_helpers/constants";
export default function TodoCard(props) {
  let day;
  let month;
  let time;
  if (props.date) {
    const req_date = new Date();
    day = req_date.getDate();
    month = monthsShortName[req_date.getMonth()];
    time = req_date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
  }

  return (
    <article className="card fl-left">
      <section className="date">
        <time dateTime={props.date ? props.date : null}>
          <span>{props.date ? day : null}</span>
          <span>{props.date ? month : null}</span>
        </time>
      </section>
      <section className="card-cont">
        <small>You can do this</small>
        <h3>{props.text}</h3>
        <div className="even-date">
          <i className="fa fa-calendar"></i>
          <time>
            <span>{props.date ? time : null}</span>
          </time>
        </div>
        <button onClick={() => props.onDone(props.index)}>done!</button>
      </section>
    </article>
  );
}
