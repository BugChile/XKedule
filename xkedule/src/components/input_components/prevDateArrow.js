import React from "react";

export default function PrevDateArrow(props) {
  return (
    <span
      onClick={() => props.clickEventDate(props.length, "prev")}
      className="arrow-left"
    ></span>
  );
}
