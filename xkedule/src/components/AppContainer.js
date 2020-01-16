import App from './App';
import MenuBar from './menu_bar/MenuBar';
import Todo from './todo/Todo';
import React, { Component } from 'react';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: null
    };
    this.state = { mode: this.props.mode };
    this.changeMode = this.changeMode.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.createItem = this.createItem.bind(this);
  }
  changeMode(mode) {
    this.setState({ mode });
  }

  createItem(item) {
    let new_item = { ...item };
    if (!item.active_date) {
      delete new_item['date_limit'];
    }
    delete new_item['active_date'];
    const id = this.props.save_callback('todos', new_item, this.props.uid);
    this.setState(prevState => {
      return { todos: { ...prevState.todos, [id]: { ...new_item, id } } };
    });
  }

  UNSAFE_componentWillMount() {
    this.setState({ todos: this.props.todos });
  }
  removeItem(to_delete_todo) {
    this.props.delete_callback('todos', this.props.uid, to_delete_todo.id);

    let new_dict = Object.assign({}, this.state.todos);
    delete new_dict[to_delete_todo.id];
    this.setState({ todos: new_dict });
  }
  render() {
    return (
      <div className='app_container'>
        <div className='calendar_container'>
          <MenuBar
            mode={this.state.mode}
            changeMode={this.changeMode}
            notifications={Object.keys(this.state.todos).length}
          />
          <div
            className={'transitions'}
            id='todo_position'
            style={displayStyle('todo', this.state.mode)}
          >
            <Todo
              onClose={this.changeMode}
              todos={this.state.todos}
              tags={this.props.tags}
              removeItem={this.removeItem}
              createItem={this.createItem}
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
          zIndex: '1000'
        }
      : container_style;

  return final_style;
};

const container_style = {
  position: 'absolute',
  left: '-100vw',
  top: 0,
  height: '100vh',
  width: 'calc(80vw)',
  backgroundColor: '#e4e4e4',
  zIndex: -1000,
  boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)'
};
