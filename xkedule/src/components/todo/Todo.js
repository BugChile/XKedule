import React, { Component } from 'react';
import TodoCard from './TodoCard';
import { exampleTodoList } from '../../js_helpers/constants';
import Plus from '../svgs/Plus';
import Ticket from '../svgs/Ticket';
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_list: exampleTodoList,
      create_active: false
    };
    this.removeItem = this.removeItem.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  onClose() {
    document.getElementById('todo_position').style.left = '-100vw';
    document.getElementById('todo_position').style.zIndex = '-1000';
  }
  open() {
    document.getElementById('todo_position').style.left = 60;
    document.getElementById('todo_position').style.zIndex = '1000';
  }
  removeItem(index) {
    const new_list = [...this.state.todo_list];
    new_list.splice(index, 1);
    this.setState({ todo_list: new_list });
  }

  createItem() {
    this.setState(prevState => ({
      create_active: !prevState.create_active
    }));
  }
  render() {
    return (
      <div
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        className='todo_container'
      >
        <div className='text_bold_title title_todo' key='date_indicator1'>
          This is your <span className='color_text_todo'>To Do</span> list
        </div>
        {/* https://www.bootdey.com/snippets/view/tickets-for-events#html */}
        <div className='todos_container'>
          {this.state.todo_list.length === 0 ? (
            <div>Cool! you have nothing</div>
          ) : null}
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
          <div style={{ width: '45%' }}></div>
          <div
            className='main_button_container_todo reversed'
            onClick={() => {
              this.onClose();
              this.props.onClose('calendar');
            }}
          >
            <div className='main_button linear_grad'></div>
            <Ticket />
          </div>
          <div
            className={[
              'create_event_button_todo',
              this.state.create_active ? 'cancel' : null
            ].join(' ')}
            onClick={this.createItem}
          >
            <Plus />
          </div>
        </div>
      </div>
    );
  }
}
