export default (response) => {
  const data = response.data;
  switch (response.status) {
    case 200:
      return data;
    case 204:
      return null;
    default:
      if (data.error) {
        console.error("Error: ", response);
        return Promise.reject(data);
      }
      return data;
  }
}