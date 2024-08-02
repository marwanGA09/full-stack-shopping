module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'server internal error';

  if (process.env.NODE_ENV === 'production') {
    res.status(err.statusCode).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status || 'error',
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
