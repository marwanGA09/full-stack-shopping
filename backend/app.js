const express = require('express');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

const productRoute = require('./router/products.js');
const AppError = require('./utils/appError.js');

const app = express();
// from any where, ONLY DEV MODE
app.use(cors());
// PRODUCTION MODE
// const corsOption = {
//   origin: 'https://m-shopping-page.onrender.com',
// };

// app.use(cors(corsOption));

app.use(morgan('dev'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/v1/products', productRoute);

// GLOBAL ERROR CONTROL
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} this address is not known`, 500));
  //   next(new Error(`${req.originalUrl} this address is not known`));
});

app.use((err, req, res, next) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'server internal error';

  res.status(err.statusCode).json({
    status: err.status || 'error',
    message: err.message,
  });
});

module.exports = app;
