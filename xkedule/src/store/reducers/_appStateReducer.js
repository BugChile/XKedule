import { actionTypes } from '../actions';

const defaultState = {
  infoDailyEvent: null,
  currentTime: new Date(),

}

const appStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_INFO_DAILY_EVENT:
      return { ...state, infoDailyEvent: action.event }
    case actionTypes.UPDATE_CURRENT_TIME:
        return { ...state, currentTime: new Date() }
    default:
      return defaultState;
  }
};

export default appStateReducer;
