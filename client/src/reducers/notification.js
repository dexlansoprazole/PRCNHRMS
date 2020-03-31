import {actionTypes} from '../constants';

const initialState = {
  alerts: [],
  toasts: []
}

function notification(state = initialState, action) {
  let toasts = state.toasts.slice();
  let alerts = state.alerts.slice();
  let idxToast = state.toasts.length > 0 ? Math.max(...state.toasts.map(a => a.index)) + 1 : 0;
  let idxAlert = state.alerts.length > 0 ? Math.max(...state.alerts.map(a => a.index)) + 1 : 0;
  switch (action.type) {
    case actionTypes.INIT_AUTH_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '載入失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.GET_MEMBERS_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '取得成員失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.GET_TEAM_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '取得戰隊失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.LOGIN_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '登入失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.LOGOUT_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '登出成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.LOGOUT_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '登出失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.ADD_MEMBER_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '新增成員成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.ADD_MEMBER_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '新增成員失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.DELETE_MEMBER_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '刪除成員成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.DELETE_MEMBER_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '刪除成員失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.PATCH_MEMBER_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '修改成員成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.PATCH_MEMBER_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '修改成員失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.ADD_TEAM_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '建立戰隊成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.ADD_TEAM_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '建立戰隊失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.DELETE_TEAM_SUCCESS:
      alerts.push({
        index: idxAlert,
        type: 'success',
        title: '成功',
        msg: '刪除戰隊成功'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.DELETE_TEAM_FAILURE:
      alerts.push({
        index: idxAlert,
        type: 'danger',
        title: '錯誤',
        msg: '刪除戰隊失敗'
      });
      return Object.assign({}, state, {
        alerts
      });
    case actionTypes.REMOVE_TOAST:
      toasts = toasts.filter(t => t.index !== action.index);
      return Object.assign({}, state, {
        toasts
      });
    case actionTypes.REMOVE_ALERT:
      alerts = alerts.filter(a => a.index !== action.index);
      return Object.assign({}, state, {
        alerts
      });
    default:
      return state;
  }
}

export default notification;