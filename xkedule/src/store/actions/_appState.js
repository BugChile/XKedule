import { actionTypes } from './index';

export const setInfoDailyEvent = (event) => ({
  type: actionTypes.SET_INFO_DAILY_EVENT,
  event,
})

export const updateCurrentTime = () => ({
  type: actionTypes.UPDATE_CURRENT_TIME,
})

export const setAuxTime = (date) => ({
  type: actionTypes.SET_AUX_TIME,
  date
})

export const updateAuxTime = () => ({
  type: actionTypes.UPDATE_AUX_TIME,
})