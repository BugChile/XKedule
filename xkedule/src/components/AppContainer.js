import App from "./App";
import MenuBar from "./menu_bar/MenuBar";
import Todo from "./todo/Todo";
import React, { Component } from "react";
import Notes from "./notes/Notes";
import Notes2 from "./notes/Notes2";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: null,
      notes: null
    };
    this.state = { mode: this.props.mode };
    this.changeMode = this.changeMode.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.createTodo = this.createTodo.bind(this);
  }
  changeMode(mode) {
    this.setState({ mode });
    localStorage.setItem("app_mode", mode);
  }

  createTodo(item) {
    let new_item = { ...item, date_limit: item.date_limit.getTime() };
    if (!item.active_date) {
      delete new_item["date_limit"];
    }
    delete new_item["active_date"];
    const id = this.props.save_callback("todos", new_item, this.props.uid);
    this.setState(prevState => {
      return {
        todos: {
          ...prevState.todos,
          [id]: { ...new_item, id }
        }
      };
    });
  }

  removeNote(to_delete_todo) {
    this.props.delete_callback("notes", this.props.uid, to_delete_todo.id);

    let new_dict = Object.assign({}, this.state.todos);
    delete new_dict[to_delete_todo.id];
    this.setState({ todos: new_dict });
  }

  createNote(note) {
    let new_note = { ...note };
    const id = this.props.save_callback("todos", new_note, this.props.uid);
    this.setState(prevState => {
      return {
        notes: {
          ...prevState.todos,
          [id]: { ...new_note, id }
        }
      };
    });
  }

  removeTodo(to_delete_todo) {
    this.props.delete_callback("todos", this.props.uid, to_delete_todo.id);

    let new_dict = Object.assign({}, this.state.todos);
    delete new_dict[to_delete_todo.id];
    this.setState({ todos: new_dict });
  }

  UNSAFE_componentWillMount() {
    this.setState({ todos: this.props.todos });
    this.setState({ notes: this.props.notes });
  }

  render() {
    return (
      <div className="app_container">
        <div className="calendar_container">
          <MenuBar
            mode={this.state.mode}
            changeMode={this.changeMode}
            notifications={Object.keys(this.state.todos).length}
          />
          <div
            className={"transitions"}
            id="todo_position"
            style={displayStyle("todos", this.state.mode)}
          >
            <Todo
              onClose={this.changeMode}
              todos={this.state.todos}
              tags={this.props.tags}
              removeTodo={this.removeTodo}
              createTodo={this.createTodo}
            />
          </div>
          <div
            className={"transitions"}
            id="notes_position"
            style={displayStyle("notes", this.state.mode)}
          >
            <Notes2
              // onClose={this.changeMode}
              notes={this.state.notes}
              // tags={this.props.tags}
              // removeTodo={this.removeTodo}
              // createTodo={this.createTodo}
            />
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

const displayStyle = (mode, currentMode) => {
  const final_style =
    mode === currentMode
      ? {
          ...container_style,
          left: 60,
          zIndex: "1000"
        }
      : container_style;

  return final_style;
};

const container_style = {
  position: "absolute",
  left: "-100vw",
  top: 0,
  height: "100vh",
  width: "calc(80vw)",
  backgroundColor: "#e4e4e4",
  zIndex: -1000,
  boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)"
};
