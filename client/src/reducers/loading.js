const initialState = false

function loading(state = initialState, action) {
  const {type} = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: (state[requestName] == null ? 0 : state[requestName]) + (requestState === 'REQUEST' ? 1 : -1),
  };
}

export default loading;