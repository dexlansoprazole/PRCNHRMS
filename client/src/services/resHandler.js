import LogRocket from 'logrocket';

export default (response) => {
  const data = response.data;
  if (response.status !== 200) {
    if(data.error){
      console.error("Error (" + response.status + "): " + data.message);
      LogRocket.captureMessage("Error (" + response.status + "): " + data.message);
      return Promise.reject(data);
    }
  }

  return data;
}