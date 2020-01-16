import React from "react";
import MenuItem from "./MenuItem";

export default function MenuBar(props) {
  return (
    <div className="menu_container">
      <MenuItem
        active={props.mode === "calendar"}
        text="Calendar"
        icon="far fa-calendar-alt"
        onClick={() => props.changeMode("calendar")}
      />
      <MenuItem
        active={props.mode === "todo"}
        text="ToDo"
        icon="far fa-list-alt"
        notifications={props.notifications}
        onClick={() =>
          props.changeMode(props.mode !== "todo" ? "todo" : "calendar")
        }
      />
      <MenuItem
        active={props.mode === "notes"}
        text="Notes"
        icon="far fa-sticky-note"
        onClick={() =>
          props.changeMode(props.mode !== "notes" ? "notes" : "calendar")
        }
      />
      <MenuItem
        active={props.mode === "links"}
        text="Links"
        icon="fas fa-external-link-alt"
        onClick={() =>
          props.changeMode(props.mode !== "links" ? "links" : "calendar")
        }
      />
    </div>
  );
}
