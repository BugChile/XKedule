import React from 'react';
import App from './App';
import Todo from './todo/Todo';

export default function AppContainer(props) {
  return (
    <div>
      <App
        events={props.loadEvents}
        tags={props.loadTags}
        save_callback={props.saveCallback}
        update_callback={props.updateCallback}
        delete_callback={props.deleteCallback}
        uid={props.userUid}
        mode={props.mode}
      />
      <Todo className={props.todoClassName} activated={props.todoActivated} />
    </div>
  );
}
