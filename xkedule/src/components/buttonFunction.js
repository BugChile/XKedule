import React from "react";

export default function ButtonFunction(props) {
  return (
    <span
      className={"button_min ".concat(props.cssClass)}
      onClick={props.function}
    >
      <i className={"glyphicon glyphicon-".concat(props.cssIcon)}>
        {props.text}
      </i>
    </span>
  );
}
