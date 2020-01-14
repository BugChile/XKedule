import React, { Component } from 'react';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: this.props.activated
    };
    this.hide = this.hide.bind(this);
  }
  hide() {
    this.setState(prevState => ({
      activated: !prevState.activated
    }));
  }
  render() {
    console.log(this.state);
    return (
      <div className='todo'>
        <button onClick={this.hide}>
          {this.state.activated ? 'Hide' : 'ToDo'}
        </button>
        <div
          className={
            this.state.activated ? 'todo_activated' : 'todo_deactivated'
          }
        >
          todo list todo list todo list todo list todo list todo list todo list
          todo list
        </div>
      </div>
    );
  }
}
