const express = require('express');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

const productRoute = require('./router/products');

const app = express();
// from any where, ONLY DEV MODE
// app.use(cors());
// PRODUCTION MODE
const corsOption = {
  origin: 'https://m-shopping-page.onrender.com',
};

app.use(cors(corsOption));

app.use(morgan('dev'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productRoute);

module.exports = app;
