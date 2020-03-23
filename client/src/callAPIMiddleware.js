function callAPIMiddleware({ dispatch }) {
  return next =>async action =>{
    const {
      types,
      callAPI,
    } = action

    if (!types) {
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    const [requestType, successType, failureType] = types

    dispatch({ type: requestType });
    
    try {
      const res = await callAPI();
      dispatch({ type: successType, res });
    } catch (error) {
      dispatch({ type: failureType, error });
    }
  }
}

export default callAPIMiddleware;