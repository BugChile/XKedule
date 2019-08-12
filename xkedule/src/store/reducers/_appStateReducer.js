import { actionTypes } from '../actions';

const defaultState = {
  infoDailyEvent: null,
  currentTime: new Date(),
  auxTime: new Date(),
}

const appStateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_INFO_DAILY_EVENT:
      return { ...state, infoDailyEvent: action.event }
    case actionTypes.UPDATE_CURRENT_TIME:
        return { ...state, currentTime: new Date() }
    case actionTypes.SET_AUX_TIME:
        return { ...state, auxTime: action.date }
    case actionTypes.UPDATE_AUX_TIME: {
      const updatedAuxTime = new Date(state.auxTime);
      const currentTime = new Date();
      updatedAuxTime.setSeconds(currentTime.getSeconds());
      return { ...state, auxTime: updatedAuxTime }
    }
    default:
      return defaultState;
  }
};

export default appStateReducer;
