import React from "react";

export default function SearchBar(props) {
  return (
    <form
      action={`https://www.google.com/webhp?tab=ww&ei=m8UiU9OUI8T7oATGiIDYBQ&ved=0CBcQ1S4#q=${props.search.replace(
        " ",
        "+"
      )}`}
      className="search_bar_container"
    >
      <input
        type="text"
        className="search_bar"
        placeholder="Search on Google..."
        onChange={props.onChange}
      />
      {/* POSIBLE AGREGAR LOGO */}
      {/* <button type="submit" className="search_button"><span className="glyphicon glyphicon-search"></span></button> */}
    </form>
  );
}
