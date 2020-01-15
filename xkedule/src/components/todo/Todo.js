import React, { Component } from "react";
import TodoCard from "./TodoCard";
import { exampleTodoList } from "../../js_helpers/constants";
import Plus from "../svgs/Plus";
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_list: exampleTodoList
    };
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(index) {
    const new_list = [...this.state.todo_list];
    new_list.splice(index, 1);
    this.setState({ todo_list: new_list });
  }

  render() {
    return (
      <div
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        className="todo_container"
      >
        {/* https://www.bootdey.com/snippets/view/tickets-for-events#html */}
        {/* <div>To Do List</div> */}
        <div className="todos_container">
          {this.state.todo_list.map((item, index) => {
            return (
              <TodoCard
                key={`todo_item_${index}`}
                date={item.date}
                text={item.text}
                index={index}
                onDone={this.removeItem}
              />
            );
          })}

          {/* document.getElementById("create_event_button").classList.add("cancel"); */}
          <div className="create_event_button_todo" onClick={this.createEvent}>
            <Plus />
          </div>
        </div>
      </div>
    );
  }
}
