const ProductModel = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getAllProducts = catchAsync(async (req, res, next) => {
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
  const currentProduct = await ProductModel.findById(id);
  if (!currentProduct) {
    throw new AppError(`product with ${id} is not found`, 404);
  }
  res.json({
    status: 'success',
    products: { data: currentProduct },
  });
});

const addProduct = catchAsync(async (req, res, next) => {
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
