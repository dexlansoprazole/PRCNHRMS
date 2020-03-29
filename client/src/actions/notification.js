import {actionTypes} from '../constants';

const removeToast = (index) => {
  return {type: actionTypes.REMOVE_TOAST, index};
}

export default {
  removeToast
};