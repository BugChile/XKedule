import { actionTypes } from '../actions';

const eventsWithRepeatReducer = (events = [], action) => {
  switch (action.type) {
    case actionTypes.SET_EVENTS_WITH_REPEAT:
      return action.events;
    default:
      return events;
  }
};

export default eventsWithRepeatReducer;
