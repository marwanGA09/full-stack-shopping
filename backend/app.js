const express = require('express');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

const productControllers = require('./controllers/products');
console.log('productcontroller', productControllers);
const app = express();
// from any where, ONLY DEV MODE
// app.use(cors());
// PRODUCTION MODE
const corsOption = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOption));

app.use(morgan('dev'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', productControllers.getAllProducts);

app.get('/products/:id', productControllers.getProduct);

app.post('/products', productControllers.addProduct);

module.exports = app;
