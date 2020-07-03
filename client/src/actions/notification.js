import {actionTypes} from '../constants';

const setAlert = (alert) => {
  return {type: actionTypes.SET_ALERT, alert};
}

export default {
  setAlert
};