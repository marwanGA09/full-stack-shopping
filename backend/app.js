const express = require('express');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const DB_URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.PASSWORD
);

console.log(DB_URL);

mongoose.connect(DB_URL).then((conn) => {
  console.log('connected');
  //   console.log(conn.connection);
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
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

const testProduct = new Product({
  id: '111',
  title: 'xxxxxation)',
  price: 199,
  description:
    'Imme active noise cancellation. Enjoy personalized spatial audio and long battery life. Perfect for on-the-go listening.',
  category: 'electronics',
  image:
    'https://hips.hearstapps.com/hmg-prod/images/apple-air-pods-2nd-generation-1663778472.jpg?crop=0.501xw:1.00xh;0.249xw,0&resize=640:*',
  rating: { count: 100 },
});

testProduct.save().then(() => console.log('save'));

const productRoute = require('./router/products');

const app = express();
// from any where, ONLY DEV MODE
app.use(cors());
// PRODUCTION MODE
// const corsOption = {
//   origin: 'https://m-shopping-page.onrender.com',
// };

// app.use(cors(corsOption));

app.use(morgan('dev'));

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', productRoute);

module.exports = app;
