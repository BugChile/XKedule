/*global firebase*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';



var config = {
    apiKey: "AIzaSyDXr3ZgSUDwQSoqFySYmoboBGpSlHdyCG4",
    authDomain: "xkedule.firebaseapp.com",
    projectId: "xkedule",
  };

firebase.initializeApp(config);
var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

function save_event(json, uid){
    var new_event_ref = db.collection("users").doc(uid)
                        .collection("events").doc();
    json.id = new_event_ref.id;
    new_event_ref.set(json);
    return new_event_ref.id;
}

function update_event(json, uid, event_id){
    var updated_event_ref = db.collection("users").doc(uid)
                        .collection("events").doc(event_id);
    json.id = updated_event_ref.id;
    updated_event_ref.update(json);
    return updated_event_ref.id;
}


chrome.storage.sync.get(['user_id'], function(result) {
    // change this, only for quick testing
          if ("ECrUR0rRnLflN10PqPjcNj2otEQ2") {
              db.collection("users").doc("ECrUR0rRnLflN10PqPjcNj2otEQ2").collection("events").get().then(function(querySnapshot) {
                    var events = {}
                    var event_data = {};
                    querySnapshot.forEach(function(_event) {
                        event_data = _event.data();
                        event_data.id = _event.id
                        events[_event.id] = event_data;
                    });
                    console.log(events);
                    ReactDOM.render(<App events={events}
                                         save_event_callback={save_event}
                                         update_event_callback={update_event}
                                         uid={"ECrUR0rRnLflN10PqPjcNj2otEQ2"}
                                         />, document.getElementById('app_root'));

                });


          } else {
              firebase.auth().signInWithPopup(provider).then(function(result) {
                  var token = result.credential.accessToken;
                  var user = result.user;
                  chrome.storage.sync.set({"user_id": user.uid});
                  db.collection("users").doc(user.uid).set({
                            name: user.displayName});
                }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  var email = error.email;
                  var credential = error.credential;
                });
          }
        });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
