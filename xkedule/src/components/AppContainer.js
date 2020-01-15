import App from "./App";
import MenuBar from "./menu_bar/MenuBar";
import Todo from "./todo/Todo";
import React, { Component } from "react";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: this.props.mode };
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(mode) {
    this.setState({ mode });
  }
  render() {
    return (
      <div className="app_container">
        <div className="calendar_container">
          <MenuBar mode={this.state.mode} changeMode={this.changeMode} />
          <div
            style={displayStyle(this.state.mode, "todo")}
            className={"transitions"}
          >
            <Todo />
          </div>
          <App
            events={this.props.events}
            tags={this.props.tags}
            save_callback={this.props.save_callback}
            update_callback={this.props.update_callback}
            delete_callback={this.props.delete_callback}
            uid={this.props.uid}
            mode={this.props.calendar_mode}
          />
        </div>
      </div>
    );
  }
}

const displayStyle = (boolean, currentMode) => {
  const style = {
    position: "absolute",
    left: 60,
    top: 0,
    height: "100vh",
    width: "calc(100vw -  60px)",
    zIndex: -1000,
    opacity: 0
  };
  const final_style =
    boolean === currentMode
      ? {
          ...style,
          zIndex: 1000,
          backgroundColor: "#e4e4e4",
          opacity: 1
        }
      : style;

  return final_style;
};
