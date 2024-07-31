const ProductModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    let allProducts = ProductModel.find();
    allProducts = await allProducts.sort('title');
    return res.json({
      status: 'success',
      totalProduct: allProducts.length,
      products: { data: allProducts },
    });
  } catch (err) {
    res.status(404).json({ status: 'failure', message: 'no data' });
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('get single with id', id);
    const currentProduct = await ProductModel.find({ _id: id });
    // return res.json(currentProduct[0]);
    return res.json({
      status: 'success',
      products: { data: currentProduct[0] },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 'failure', message: 'no data with given id' });
  }
};

const addProduct = async (req, res) => {
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
