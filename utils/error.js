class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super();
    this.statusCode = statusCode;
    this.name = error.name;
    this.message = error.message;
  }
}

const handleError = (err, res) => {
  res.status(err.statusCode).json({
    error: true,
    name: err.name,
    message: err.message
  });
};

module.exports = {
  ErrorHandler,
  handleError
}