/*global firebase*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SearchContainer from './components/search_box/search_container';
import * as serviceWorker from './serviceWorker';


// // // for production and database testing:
// var config = {
//     apiKey: "AIzaSyDXr3ZgSUDwQSoqFySYmoboBGpSlHdyCG4",
//     authDomain: "xkedule.firebaseapp.com",
//     projectId: "xkedule",
//   };

// firebase.initializeApp(config);
// var db = firebase.firestore();
// var provider = new firebase.auth.GoogleAuthProvider();

// function save_user_doc(doc_reference, json, uid){
//     var new_event_ref = db.collection("users").doc(uid)
//                         .collection(doc_reference).doc();
//     json.id = new_event_ref.id;
//     new_event_ref.set(json);
//     return new_event_ref.id;
// }

// function update_user_doc(doc_reference, json, uid, event_id){
//     var updated_event_ref = db.collection("users").doc(uid)
//                         .collection(doc_reference).doc(event_id);
//     json.id = updated_event_ref.id;
//     updated_event_ref.update(json);
//     return updated_event_ref.id;
// }

// function delete_user_doc(doc_reference, uid, event_id){
//     db.collection("users").doc(uid)
//     .collection(doc_reference).doc(event_id)
//     .delete()
//     .then(
//         function() {
//             console.log("Document successfully deleted!");
//         })
//     .catch(function(error) {
//             console.error("Error removing document: ", error);
//         });
// }


// chrome.storage.sync.get(['uid'], function(result) {
//     // change this, only for quick testing
//           if (result.uid) {
//               Promise.all([ db.collection("users").doc(result.uid).collection("events").get(),
//                             db.collection("users").doc(result.uid).collection("tags").get()])
//               .then(function(responses) {
//                         const fetched_events = responses[0];
//                         const fetched_tags = responses[1];
//                         var events = {}
//                         var tags = {}
//                         fetched_events.forEach(function(_event) {
//                             events[_event.id] = _event.data();
//                         });
//                         fetched_tags.forEach(function(_tag) {
//                             tags[_tag.id] = _tag.data();
//                         });
//                         ReactDOM.render(<App events={events}
//                                              tags={tags}
//                                              save_callback={save_user_doc}
//                                              update_callback={update_user_doc}
//                                              delete_callback={delete_user_doc}
//                                              uid={result.uid}
//                                              />, document.getElementById('app_root'));

//                     });


//           } else {
//               firebase.auth().signInWithPopup(provider).then(function(result) {
//                   var token = result.credential.accessToken;
//                   var user = result.user;
//                   chrome.storage.sync.set({"uid": user.uid});
//                   db.collection("users").doc(user.uid).set({
//                                         name: user.displayName});

//                   Promise.all([ db.collection("users").doc(user.uid).collection("events").get(),
//                                 db.collection("users").doc(user.uid).collection("tags").get()])
//                   .then(function(responses) {
//                             const fetched_events = responses[0];
//                             const fetched_tags = responses[1];
//                             var events = {}
//                             var tags = {}
//                             fetched_events.forEach(function(_event) {
//                                 events[_event.id] = _event.data();
//                             });
//                             fetched_tags.forEach(function(_tag) {
//                                 tags[_tag.id] = _tag.data();
//                             });
//                             ReactDOM.render(<App events={events}
//                                                  tags={tags}
//                                                  save_callback={save_user_doc}
//                                                  update_callback={update_user_doc}
//                                                  delete_callback={delete_user_doc}
//                                                  uid={user.uid}
//                                                  />, document.getElementById('app_root'));

//                         });



//                 }).catch(function(error) {
//                   var errorCode = error.code;
//                   var errorMessage = error.message;
//                   var email = error.email;
//                   var credential = error.credential;
//                   console.log(errorMessage);
//                 });
//           }
//       });


// for development:
import { events, user_tags }  from './js_helpers/dev_data';

ReactDOM.render(<App events={events}
                     tags={user_tags}
                     save_callback={() => {console.log("save placeholder");return "0"}}
                     update_callback={() => {console.log("update placeholder");return "0"}}
                     delete_callback={() => {console.log("delete placeholder");return "0"}}
                     uid={"uid"}
                     />, document.getElementById('app_root'));

ReactDOM.render(<SearchContainer />, document.getElementById('search_box'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
