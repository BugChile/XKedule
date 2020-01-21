/*global firebase*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import SearchContainer from './components/search_box/search_container';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

import {
  hcEvents,
  hcUserTags,
  hcUserTodos,
  hcUserNotes,
} from './js_helpers/dev_data';
import AppContainer from './components/AppContainer';

const calendar_mode = localStorage.getItem('mode') || 'daily';
const app_mode = localStorage.getItem('app_mode') || 'calendar';

var db;
let loadEvents;
let loadTags;
let loadTodos;
let loadNotes;
let userUid;
let saveCallback;
let updateCallback;
let deleteCallback;

function save_user_doc(doc_reference, json, uid) {
  var new_event_ref = db
    .collection('users')
    .doc(uid)
    .collection(doc_reference)
    .doc();
  json.id = new_event_ref.id;
  new_event_ref.set(json);
  return new_event_ref.id;
}

function update_user_doc(doc_reference, json, uid, event_id) {
  var updated_event_ref = db
    .collection('users')
    .doc(uid)
    .collection(doc_reference)
    .doc(event_id);
  json.id = updated_event_ref.id;
  updated_event_ref.update(json);
  return updated_event_ref.id;
}

function delete_user_doc(doc_reference, uid, event_id) {
  db.collection('users')
    .doc(uid)
    .collection(doc_reference)
    .doc(event_id)
    .delete()
    .then(function() {
      console.log('Document successfully deleted!');
    })
    .catch(function(error) {
      console.error('Error removing document: ', error);
    });
}

function startApp(uid) {
  Promise.all([
    db
      .collection('users')
      .doc(uid)
      .collection('events')
      .get(),
    db
      .collection('users')
      .doc(uid)
      .collection('tags')
      .get(),
    db
      .collection('users')
      .doc(uid)
      .collection('todos')
      .get(),
    db
      .collection('users')
      .doc(uid)
      .collection('notes')
      .get(),
  ]).then(function(responses) {
    const fetched_events = responses[0];
    const fetched_tags = responses[1];
    const fetched_todos = responses[2];
    const fetched_notes = responses[3];
    var events = {};
    var tags = {};
    var todos = {};
    var notes = {};
    fetched_events.forEach(function(_event) {
      events[_event.id] = _event.data();
    });
    fetched_tags.forEach(function(_tag) {
      tags[_tag.id] = _tag.data();
    });
    fetched_todos.forEach(function(_item) {
      todos[_item.id] = _item.data();
    });
    fetched_notes.forEach(function(_item) {
      notes[_item.id] = _item.data();
    });
    loadEvents = events;
    loadTags = tags;
    loadTodos = todos;
    loadNotes = notes;
    userUid = uid;
    renderApp();
  });
}

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer
        events={loadEvents}
        tags={loadTags}
        todos={loadTodos}
        notes={loadNotes}
        save_callback={saveCallback}
        update_callback={updateCallback}
        delete_callback={deleteCallback}
        uid={userUid}
        calendar_mode={calendar_mode}
        mode={app_mode}
      />
    </Provider>,
    document.getElementById('app_root'),
  );

  ReactDOM.render(<SearchContainer />, document.getElementById('search_box'));
}

if (process.env.NODE_ENV === 'production') {
  var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
  };
  firebase.initializeApp(config);
  db = firebase.firestore();
  var provider = new firebase.auth.GoogleAuthProvider();

  saveCallback = save_user_doc;
  updateCallback = update_user_doc;
  deleteCallback = delete_user_doc;

  chrome.storage.sync.get(['uid'], async function(result) {
    // change this, only for quick testing
    if (result.uid) {
      startApp(result.uid);
    } else {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async function(result) {
          //   var token = result.credential.accessToken;
          var user = result.user;
          chrome.storage.sync.set({ uid: user.uid });
          db.collection('users')
            .doc(user.uid)
            .set({
              name: user.displayName,
            });
          startApp(user.uid);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.warn(errorCode, errorMessage);
        });
    }
  });
} else if (process.env.NODE_ENV === 'development') {
  var index = 0;
  loadEvents = hcEvents;
  loadTags = hcUserTags;
  loadTodos = hcUserTodos;
  loadNotes = hcUserNotes;
  userUid = 'uid';
  saveCallback = (a, b, c) => {
    console.log('save placeholder');
    index += 1;
    console.log(index);
    return `${index}`;
  };
  updateCallback = (a, b, c, d) => {
    console.log('update placeholder');
    return d;
  };
  deleteCallback = () => {
    console.log('delete placeholder');
    return '0';
  };
  renderApp();
} else {
  const error = { code: 300, message: 'Invalid env.' };
  throw error;
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
