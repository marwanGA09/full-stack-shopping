const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');

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

function readFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

let products = readFile(`${__dirname}/json/data.json`);

const getAllProducts = (req, res) => {
  console.log(products.length);
  res.json(products);
};

const getProduct = (req, res) => {
  const id = req.params.id;
  const currentProduct = products.find((product) => product.id === id);
  if (currentProduct) res.json(currentProduct);
  res.status(404).end();
};

const addProduct = (req, res) => {
  const data = req.body;
  products = [...products, data];
  writeFile(`${__dirname}/json/data.json`, products);

  res.json({
    status: 'success',
    data: {
      product: data,
    },
  });
};

function writeFile(path, content) {
  fs.writeFile(path, JSON.stringify(content), (err) => {
    err && console.error(err);
    console.log('successful');
  });
}

app.get('/products', getAllProducts);

app.get('/products/:id', getProduct);

app.post('/products', addProduct);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log('server listening on ', PORT));
