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
chrome.storage.sync.get(['user_id'], function(result) {
          if ("ECrUR0rRnLflN10PqPjcNj2otEQ2") {
              db.collection("users").doc("ECrUR0rRnLflN10PqPjcNj2otEQ2").collection("events").get().then(function(querySnapshot) {
                    var events = {}
                    querySnapshot.forEach(function(doc) {
                        events[doc.id] = doc.data();
                    });
                    console.log(events);
                    ReactDOM.render(<App events={events}/>, document.getElementById('app_root'));

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
