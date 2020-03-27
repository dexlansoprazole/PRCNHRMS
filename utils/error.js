class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super(error.message);
    this.statusCode = statusCode;
    this.name = error.name;
  }
}

const handleError = (err, res, next) => {
  res.status(err.statusCode).json({
    error: true,
    name: err.name,
    message: err.message
  });
  next(err)
};

module.exports = {
  ErrorHandler,
  handleError
}