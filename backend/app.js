const express = require('express');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

const productRoute = require('./router/products.js');
const AppError = require('./utils/appError.js');
const errorController = require('./controllers/errorController.js');

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
});

app.use(errorController);

module.exports = app;
