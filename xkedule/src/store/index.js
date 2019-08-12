import { createStore, combineReducers } from 'redux';

import { 
  eventsWithRepeatReducer,
  appStateReducer,
} from './reducers';

export default createStore(
  combineReducers({
    eventsWithRepeat: eventsWithRepeatReducer,
    appState: appStateReducer,
  })
)