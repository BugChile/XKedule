/*global firebase*/
/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import SearchContainer from './components/search_box/search_container';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'

//// for development:

import { hcEvents, hcUserTags } from './js_helpers/dev_data';

var db;

var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
};

function save_user_doc(doc_reference, json, uid) {
    var new_event_ref = db.collection("users").doc(uid)
        .collection(doc_reference).doc();
    json.id = new_event_ref.id;
    new_event_ref.set(json);
    return new_event_ref.id;
}

function update_user_doc(doc_reference, json, uid, event_id) {
    var updated_event_ref = db.collection("users").doc(uid)
        .collection(doc_reference).doc(event_id);
    json.id = updated_event_ref.id;
    updated_event_ref.update(json);
    return updated_event_ref.id;
}

function delete_user_doc(doc_reference, uid, event_id) {
    db.collection("users").doc(uid)
        .collection(doc_reference).doc(event_id)
        .delete()
        .then(
            function () {
                console.log("Document successfully deleted!");
            })
        .catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

let loadEvents;
let loadTags;
let userUid;
let saveCallback;
let updateCallback;
let deleteCallback;
// if (process.env.NODE_ENV === 'production') {
//     firebase.initializeApp(config);
//     db = firebase.firestore();
//     var provider = new firebase.auth.GoogleAuthProvider();

//     saveCallback = save_user_doc;
//     updateCallback = update_user_doc;
//     deleteCallback = delete_user_doc;


//     chrome.storage.sync.get(['uid'], async function (result) {
//         // change this, only for quick testing
//         if (result.uid) {
//             Promise.all([db.collection("users").doc(result.uid).collection("events").get(),
//             db.collection("users").doc(result.uid).collection("tags").get()])
//                 .then(function (responses) {
//                     const fetched_events = responses[0];
//                     const fetched_tags = responses[1];
//                     var events = {}
//                     var tags = {}
//                     fetched_events.forEach(function (_event) {
//                         events[_event.id] = _event.data();
//                     });
//                     fetched_tags.forEach(function (_tag) {
//                         tags[_tag.id] = _tag.data();
//                     });
//                     loadEvents = events;
//                     loadTags = tags;
//                     userUid = result.uid;
//                     renderApp();
//                 });


//         } else {
//             firebase.auth().signInWithPopup(provider).then(async function (result) {
//                 var token = result.credential.accessToken;
//                 var user = result.user;
//                 chrome.storage.sync.set({ "uid": user.uid });
//                 db.collection("users").doc(user.uid).set({
//                     name: user.displayName
//                 });

//                 Promise.all([db.collection("users").doc(user.uid).collection("events").get(),
//                 db.collection("users").doc(user.uid).collection("tags").get()])
//                     .then(function (responses) {
//                         const fetched_events = responses[0];
//                         const fetched_tags = responses[1];
//                         var events = {}
//                         var tags = {}
//                         fetched_events.forEach(function (_event) {
//                             events[_event.id] = _event.data();
//                         });
//                         fetched_tags.forEach(function (_tag) {
//                             tags[_tag.id] = _tag.data();
//                         });
//                         loadEvents = events;
//                         loadTags = tags;
//                         userUid = result.uid;
//                         renderApp();
//                     });
//             }).catch(function (error) {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // var email = error.email;
//                 // var credential = error.credential;
//                 console.warn(errorCode, errorMessage);
//             });
//         }
//     });
// }

// end dev


function renderApp() {
    ReactDOM.render(
        <Provider store={store}>
            <App
                events={loadEvents}
                tags={loadTags}
                save_callback={saveCallback}
                update_callback={updateCallback}
                delete_callback={deleteCallback}
                uid={userUid}
            />
        </Provider>,
        document.getElementById('app_root'));

    ReactDOM.render(<SearchContainer />, document.getElementById('search_box'));
}

////// for development:

var index = 0;
loadEvents = hcEvents;
loadTags = hcUserTags;
userUid = 'uid';
saveCallback = (a, b, c) => { console.log("save placeholder"); index += 1; return `${index}`; };
updateCallback = (a, b, c, d) => { console.log("update placeholder"); return d };
deleteCallback = () => { console.log("delete placeholder"); return "0" };
renderApp();

////// end dev

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
