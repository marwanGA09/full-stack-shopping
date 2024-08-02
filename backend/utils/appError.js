class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode * 1 >= 500 ? 'error' : 'failure';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

/*
  Error.captureStackTrace(this, this.constructor);
Purpose
The line Error.captureStackTrace(this, this.constructor); within the AppError constructor is essential for providing a more informative stack trace when an error of this type is thrown.

Breakdown
Error.captureStackTrace: This is a static method on the Error object in Node.js. It's used to capture a stack trace for a given object.
this: Refers to the current instance of the AppError class being constructed.
this.constructor: Refers to the constructor function of the AppError class.

*/
