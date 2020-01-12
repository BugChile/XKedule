import React from "react";

export default function infoCardLinks(props) {
  return (
    <div className="infoCardLinksContainer">
      {Object.entries(props.links).map(([key, value]) => {
        return (
          <a className="linkInfo" key={key} href={value.href}>
            {value.name}
          </a>
        );
      })}
    </div>
  );
}
