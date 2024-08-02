const ProductModel = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('./catchAsync');

const getAllProducts = catchAsync(async (req, res) => {
  let allProducts = ProductModel.find();
  allProducts = await allProducts.sort('title');
  res.json({
    status: 'success',
    totalProduct: allProducts.length,
    products: { data: allProducts },
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const currentProduct = await ProductModel.find({ _id: id });
  res.json({
    status: 'success',
    products: { data: currentProduct[0] },
  });
});

const addProduct = catchAsync(async (req, res) => {
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
});

module.exports = { getAllProducts, getProduct, addProduct };
