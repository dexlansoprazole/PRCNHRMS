class PermissionError extends Error {
  constructor(message = 'Permission denied'){
    super(message);
    this.name = 'PermissionError'
  }
}

const handleError = (err, res, next) => {
  let statusCode = 500;
  let name = err.name
  let message = err.message;
  switch (name) {
    case 'MongoError':
      statusCode = 400;
      message = 'Database error';
      break;
    case 'PermissionError':
      statusCode = 403;
      break;
    default:
      statusCode = 500;
      message = 'Server error';
  }
  res.status(statusCode).json({
    error: true,
    name,
    message
  });
  console.error(err.toString());
  // if (name !== 'PermissionError')
  //   next(err)
};

module.exports = {
  PermissionError,
  handleError
}