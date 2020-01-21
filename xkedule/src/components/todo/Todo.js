import React, { Component } from 'react';
import TodoCard from './TodoCard';
import Plus from '../svgs/Plus';
import Ticket from '../svgs/Ticket';
import TodoForm from '../creation_tools/todoForm';
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_active: false
    };
    this.createItemMode = this.createItemMode.bind(this);
    this.setTodos = this.setTodos.bind(this);
  }

  onClose() {
    document.getElementById('todo_position').style.left = '-100vw';
    document.getElementById('todo_position').style.zIndex = '-1000';
    this.setState({ create_active: false });
  }
  open() {
    document.getElementById('todo_position').style.left = 60;
    document.getElementById('todo_position').style.zIndex = '1000';
  }

  createItemMode() {
    this.setState(prevState => ({
      create_active: !prevState.create_active
    }));
  }

  setTodos(todos) {
    const parsedEvents = { ...todos };
    for (var key in parsedEvents) {
      if (parsedEvents[key].date_limit) {
        parsedEvents[key].date_limit = new Date(parsedEvents[key].date_limit);
      }
    }
    this.setState({ todos: parsedEvents });
  }

  UNSAFE_componentWillMount() {
    this.setTodos(this.props.todos);
  }

  render() {
    return (
      <div
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        className='todo_container'
      >
        <div className='title_tab'>
          Life is{' '}
          <span className='text_bold_title  color_text_todo'>short</span>. Do
          stuff that{' '}
          <span className='text_bold_title color_text_todo'>matter!</span>{' '}
        </div>
        {/* https://www.bootdey.com/snippets/view/tickets-for-events#html */}
        <div className='container_info_tab'>
          {Object.keys(this.props.todos).length === 0 ? (
            <div>Cool! Your productivity is in the clouds!</div>
          ) : null}
          {orderDict(this.props.todos).map((item, index) => {
            return (
              <TodoCard
                key={`todo_item_${index}`}
                todo={item}
                onDone={this.props.removeItem}
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
            onClick={this.createItemMode}
          >
            <Plus />
          </div>
          <TodoForm
            cancel={() => this.setState({ create_active: false })}
            create_active={this.state.create_active}
            createItem={item => {
              this.props.createItem(item);
              this.createItemMode();
            }}
          />
        </div>
      </div>
    );
  }
}

const orderDict = dictionary => {
  const list = [];
  const new_dict = { ...dictionary };
  Object.keys(new_dict).map((key, index) => {
    if (new_dict[key].date_limit) {
      list.push(new_dict[key]);
      delete new_dict[key];
    }
    return key;
  });
  Object.keys(new_dict).map((key, index) => list.push(new_dict[key]));
  return list;
};
