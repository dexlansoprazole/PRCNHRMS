import {actionTypes} from '../constants';

const initialState = {
  alert: null,
}

function notification(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_GOOGLESIGNIN_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '載入失敗'
        }
      });
    case actionTypes.GET_MEMBERS_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '取得成員失敗'
        }
      });
    case actionTypes.GET_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '取得戰隊失敗'
        }
      });
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '登入失敗'
        }
      });
    case actionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '登出成功'
        }
      });
    case actionTypes.LOGOUT_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '登出失敗'
        }
      });
    case actionTypes.ADD_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '新增成員成功'
        }
      });
    case actionTypes.ADD_MEMBER_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '新增成員失敗'
        }
      });
    case actionTypes.DELETE_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '刪除成員成功'
        }
      });
    case actionTypes.DELETE_MEMBER_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '刪除成員失敗'
        }
      });
    case actionTypes.PATCH_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '編輯成員成功'
        }
      });
    case actionTypes.PATCH_MEMBER_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '編輯成員失敗'
        }
      });
    case actionTypes.ADD_TEAM_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '建立戰隊成功'
        }
      });
    case actionTypes.ADD_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '建立戰隊失敗'
        }
      });
    case actionTypes.DELETE_TEAM_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '刪除戰隊成功'
        }
      });
    case actionTypes.DELETE_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '刪除戰隊失敗'
        }
      });
    case actionTypes.PATCH_TEAM_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '編輯戰隊成功'
        }
      });
    case actionTypes.PATCH_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '編輯戰隊失敗'
        }
      });
    case actionTypes.SEARCH_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '搜尋戰隊失敗'
        }
      });
    case actionTypes.ADD_JOIN_TEAM_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '申請成功'
        }
      });
    case actionTypes.ADD_JOIN_TEAM_REQUEST_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '申請失敗'
        }
      });
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '取消申請成功'
        }
      });
    case actionTypes.DELETE_JOIN_TEAM_REQUEST_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '取消申請失敗'
        }
      });
    case actionTypes.ADD_TEAM_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '新增成員成功'
        }
      });
    case actionTypes.ADD_TEAM_MEMBER_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '新增成員失敗'
        }
      });
    case actionTypes.DELETE_TEAM_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '踢除成員成功'
        }
      });
    case actionTypes.DELETE_TEAM_MEMBER_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '踢除成員失敗'
        }
      });
    case actionTypes.LEAVE_TEAM_SUCCESS:
      return Object.assign({}, state, {
        alert: {
          type: 'success',
          title: '成功',
          msg: '退出戰隊成功'
        }
      });
    case actionTypes.LEAVE_TEAM_FAILURE:
      return Object.assign({}, state, {
        alert: {
          type: 'error',
          title: '錯誤',
          msg: '退出戰隊失敗'
        }
      });
    case actionTypes.SET_ALERT:
      return Object.assign({}, state, {
        alert: action.alert
      });
    default:
      return state;
  }
}

export default notification;