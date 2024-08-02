const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
    unique: [true, 'title should be unique'],
  },
  price: { type: Number, required: [true, 'price is required field'] },
  description: {
    type: String,
    required: [true, 'description is required field'],
    trim: true,
  },
  category: { type: String, enum: ['electronics', 'cloth', 'jewelry'] },
  image: {
    type: String,
    default:
      'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1',
  },
  rating: {
    count: { type: Number, default: 1 },
  },
});

const ProductModel = mongoose.model('ProductModel', productSchema);

module.exports = ProductModel;
