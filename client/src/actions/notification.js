import {actionTypes} from '../constants';

const removeToast = (index) => {
  return {type: actionTypes.REMOVE_TOAST, index};
}

const removeAlert = (index) => {
  return {type: actionTypes.REMOVE_ALERT, index};
}

export default {
  removeToast,
  removeAlert
};