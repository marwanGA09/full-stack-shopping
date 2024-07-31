const fs = require('fs');
const ProductModel = require('../models/productModel');

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

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    return res.json(allProducts);
  } catch (err) {
    res.status(404).end();
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('get single with id', id);
    const currentProduct = await ProductModel.find({ _id: id });
    return res.json(currentProduct);
  } catch (err) {
    res.status(404).end();
  }
};

const addProduct = async (req, res) => {
  // const data = req.body;
  // products = [...products, data];
  // myWriteFile(`${__dirname}/../json/data.json`, products);

  try {
    const newProduct = new ProductModel(req.body);
    const newP = await newProduct.save();
    console.log('newProduct', newProduct);
    console.log('newP', newP);
    return res.json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log('error', err);
    return res.status(400).json({
      status: 'failure',
      message: 'Error adding product',
      error: err,
    });
  }
};

module.exports = { getAllProducts, getProduct, addProduct };
