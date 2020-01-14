import React from "react";

export default function BackToToday(props) {
  return (
    <div
      onClick={props.onClickReturn}
      id="this_is_you_line"
      className="text_15 hover"
      key="this_is_you_line"
    >
      return to <strong>your</strong> {props.type}
    </div>
  );
}
