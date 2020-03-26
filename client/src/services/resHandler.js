export default (response) => {
  const data = response.data;
  if (response.status !== 200) {
    console.error("Error (code: " + response.status + "): " + data.name + ': ' + data.errmsg);
    return Promise.reject(data);
  }

  return data;
}