import { actionTypes } from './index';

export const setInfoDailyEvent = (event) => ({
  type: actionTypes.SET_INFO_DAILY_EVENT,
  event,
})

export const updateCurrentTime = (event) => ({
  type: actionTypes.UPDATE_CURRENT_TIME,
})