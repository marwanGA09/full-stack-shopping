const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
