import { createStore, combineReducers } from 'redux';

import { 
  eventsWithRepeatReducer,
} from './reducers';

export default createStore(
  combineReducers({
    eventsWithRepeat: eventsWithRepeatReducer,
  })
)