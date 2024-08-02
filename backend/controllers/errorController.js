const devErrorSend = (err, res) => {
  console.log('dev error');
  return res.status(err.statusCode).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodErrorSend = (err, res) => {
  // BELIEVABLE ERROR
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    // Unknown error
    console.error('ERROR 🔥', err);
    return res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log('here error');
  //   console.log(err.stack);
  console.log('process', process.env);
  console.log('process node', process.env.NODE_ENV);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'server internal error';

  if (process.env.NODE_ENV === 'production') {
    prodErrorSend(err, res);
  } else if (process.env.NODE_ENV === 'development') {
    devErrorSend(err, res);
  }
};
