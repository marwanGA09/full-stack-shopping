class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode * 1 >= 500 ? 'error' : 'failure';
    this.isOperational = true;
  }
}

module.exports = AppError;
