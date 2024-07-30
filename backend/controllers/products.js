const fs = require('fs');

function readFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

let products = readFile(`${__dirname}/../json/data.json`);
// console.log(products);
function myWriteFile(path, content) {
  return fs.writeFile(path, JSON.stringify(content), (err) => {
    err && console.error(err);
    // console.log('successful');
  });
}

const getAllProducts = (req, res) => {
  // console.log('products', products);
  return res.json(products);
};

const getProduct = (req, res) => {
  const id = req.params.id;
  const currentProduct = products.find((product) => product.id === id);
  if (currentProduct) return res.json(currentProduct);
  return res.status(404).end();
};

const addProduct = (req, res) => {
  const data = req.body;
  products = [...products, data];
  myWriteFile(`${__dirname}/../json/data.json`, products);

  return res.json({
    status: 'success',
    data: {
      product: data,
    },
  });
};

module.exports = { getAllProducts, getProduct, addProduct };