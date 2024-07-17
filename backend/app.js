const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

const myJSON = JSON.parse(
  fs.readFileSync(`${__dirname}/json/data.json`, 'utf-8')
).products;
// console.log(myJSON);

const app = express();

// from any where, ONLY DEV MODE
// app.use(cors());

// PRODUCTION MODE
const corsOption = {
  origin: 'http://localhost:5173',
};
app.use(cors(corsOption));

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('<p>Here is express</p>');
});

app.get('/products', (req, res) => {
  console.log(myJSON);
  res.json(myJSON);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const currentProduct = myJSON.find((product) => product.id === id);
  if (currentProduct) res.json(currentProduct);
  res.status(404).end();
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log('server listening on ', PORT));
