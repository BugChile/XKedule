import React from "react";

export default function NextDateArrow(props) {
  return (
    <span
      onClick={() => props.clickEventDate(props.length, "next")}
      className={"arrow-right"}
    ></span>
  );
}
