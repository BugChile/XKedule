import React from "react";

export default function SubmitButton(props) {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-custom"
        onClick={props.onClick}
      >
        {props.value} <div className="notifications">{props.notifications}</div>
      </button>
    </div>
  );
}
