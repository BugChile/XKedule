import React from "react";

export default function MenuItem(props) {
  return (
    <div
      className={["menu_item", props.active ? "menu_active" : null].join(" ")}
      onClick={props.onClick}
    >
      <div>
        <i style={{ fontSize: 30 }} className={props.icon}></i>
        {props.notifications ? (
          <div className="notifications">{props.notifications}</div>
        ) : null}
      </div>
    </div>
  );
}
