import React from "react";
import ArrowExpand from "./svgs/ArrowExpand";
import Ticket from "./svgs/Ticket";

export default function MainButton(props) {
  return (
    <div
      id="main_button_container"
      className="main_button_container"
      onClick={props.function}
    >
      <div id="main_button" className="main_button linear_grad"></div>
      {getIcon(props.icon_mode)}
    </div>
  );
}

const getIcon = icon_mode => {
  switch (icon_mode) {
    case "expand":
      return <Ticket />;
    case "save":
      return <ArrowExpand />;
    default:
      let error = {
        code: 300,
        message: "Warning: should not enter in this case"
      };
      throw error;
  }
};
