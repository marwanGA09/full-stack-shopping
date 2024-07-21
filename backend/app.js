const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
// ALLOW TO BE ACCESSED FROM SPECIFIED OR ANYWHERE ON INTERNAT
const cors = require('cors');
const exp = require('constants');

let products = [
  {
    id: '1',
    title: 'Apple AirPods Pro (2nd Generation)',
    price: 199,
    description:
      'Immerse yourself in rich sound with active noise cancellation. Enjoy personalized spatial audio and long battery life. Perfect for on-the-go listening.',
    category: 'electronics',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/apple-air-pods-2nd-generation-1663778472.jpg?crop=0.501xw:1.00xh;0.249xw,0&resize=640:*',
    rating: {
      count: 1500,
    },
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    price: 1199,
    description:
      'Experience ultimate performance with a stunning display and advanced camera system. Capture incredible photos and videos, and enjoy seamless multitasking.',
    category: 'electronics',
    image:
      'https://m.media-amazon.com/images/I/71EYdOx09+L._AC_UF1000,1000_QL80_.jpg',
    rating: {
      count: 2200,
    },
  },
  {
    id: '3',
    title: 'Sony PlayStation 5',
    price: 499,
    description:
      'Next-gen gaming console with lightning-fast load times and stunning visuals. Enjoy immersive gameplay and exclusive titles.',
    category: 'electronics',
    image:
      'https://i5.walmartimages.com/seo/Sony-PlayStation-5-Video-Game-Console_1536c1c9-0c26-4ce6-a5e1-1825ca064d05.1434e86832a815bb366d12b0a854390d.jpeg',
    rating: {
      count: 3500,
    },
  },
  {
    id: '4',
    title: 'Apple MacBook Pro 14-inch',
    price: 1999,
    description:
      'Powerful laptop with a brilliant display, ideal for professionals and creators. Enjoy long battery life and seamless performance.',
    category: 'electronics',
    image:
      'https://i.pcmag.com/imagery/reviews/05POeP7aWhKjIKkZ15YCZa9-21..v1635374572.jpg',
    rating: {
      count: 1800,
    },
  },
  {
    id: '5',
    title: 'Logitech G Pro X Wireless Gaming Headset',
    price: 149,
    description:
      'Experience immersive gaming audio with exceptional comfort. Enjoy clear communication and precise sound for competitive gameplay.',
    category: 'electronics',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEv564MSz3Yc8dzrnH3U4lnnmTEPK9d0MNhQ&s',
    rating: {
      count: 1200,
    },
  },
  {
    id: '6',
    title: 'LG OLED C2 55-inch Smart TV',
    price: 1799,
    description:
      'Immerse yourself in stunning picture quality with perfect blacks and vibrant colors. Enjoy smart TV features and cinematic viewing experience.',
    category: 'electronics',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAtrcS_NVJbEqd9toalKbhQl6PMxZNfd46Jg&s',
    rating: {
      count: 2500,
    },
  },
  {
    id: '7',
    title: "Men's Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      'Slim fit, contrast sleeves, henley placket. Soft, breathable fabric.',
    category: 'cloth',
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      count: 259,
    },
  },
  {
    id: '8',
    title: "Men's Cotton Jacket",
    price: 55.99,
    description: 'Versatile jacket for all seasons. Perfect for outdoors.',
    category: 'cloth',
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: {
      count: 500,
    },
  },
  {
    id: '9',
    title: 'Mens Classic Fit Basic Tee',
    price: 7.99,
    description: 'Soft, comfy, everyday essential.',
    category: 'cloth',
    image:
      'https://knowledgecottonapparel.com/cdn/shop/files/Regular_fit_Basic_tee-T-shirts-1010113-1388_Cub_180x@2x.jpg?v=1692089885',
    rating: {
      count: 250,
    },
  },
  {
    id: '10',
    title: "Men's Linen Blend Casual Shirts",
    price: 25.99,
    description:
      'Lightweight, breathable linen blend. Perfect for warm weather.',
    category: 'cloth',
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: {
      count: 450,
    },
  },
  {
    id: '11',
    title: "Men's Slim Fit Lightweight Casual Button-Down Shirt",
    price: 22.49,
    description: 'Stylish, comfy button-down. Perfect for casual or office.',
    category: 'cloth',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/31WwA7VUnZL._SL500_._AC_SL500_.jpg',
    rating: {
      count: 320,
    },
  },
  {
    id: '12',
    title: "Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    description: 'Comfy, stylish boat neck top. Perfect for layering.',
    category: 'cloth',
    image: 'https://i.ebayimg.com/images/g/KLUAAOSwewpmVDPa/s-l1200.jpg',
    rating: {
      count: 350,
    },
  },
  {
    id: '13',
    title: "Women's Casual Jumper",
    price: 23.85,
    description: 'Soft, cozy jumper. Perfect for casual wear.',
    category: 'cloth',
    image:
      'https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/AltItemShot/315x472/C32019s.jpg',
    rating: {
      count: 400,
    },
  },
  {
    id: '14',
    title: "Women's Long Sleeve Scoop Neck Pullover",
    price: 14.85,
    description: 'Versatile pullover. Soft, comfy fabric.',
    category: 'cloth',
    image: 'https://m.media-amazon.com/images/I/511npeT+tRL._AC_UY1000_.jpg',
    rating: {
      count: 380,
    },
  },
  {
    id: '15',
    title: "Women's Chiffon Party Dress",
    price: 34.99,
    description: 'Elegant chiffon dress. Perfect for special occasions.',
    category: 'cloth',
    image:
      'https://7001a1cd9337223f1824-ef2838910405c4c8d4cb235f622499e2.ssl.cf2.rackcdn.com/product-hugerect-869856-216547-1482339530-fe2352ce9bd9e390cd200933ac75c30b.png',
    rating: {
      count: 420,
    },
  },
  {
    id: '16',
    title: "Women's Short Sleeve Button Down Shirt",
    price: 24.99,
    description: 'Classic button-down shirt. Versatile and stylish.',
    category: 'cloth',
    image:
      'https://images-cdn.ubuy.qa/6513b2e7fcf4b717db7d529d-women-s-cotton-basic-simple-stretch.jpg',
    rating: {
      count: 370,
    },
  },
];

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

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<p>Here is express</p>');
});

app.get('/products', (req, res) => {
  //   console.log(myJSON);
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const currentProduct = products.find((product) => product.id === id);
  if (currentProduct) res.json(currentProduct);
  res.status(404).end();
});

app.post('/addProduct', (req, res) => {
  console.log('posted');
  // const datalength = products.length;
  const data = req.body;
  console.log('data', data);
  products = [...products, data];
  // console.log('new products', products);
  fs.writeFile(
    `${__dirname}/json/data.json`,
    JSON.stringify(products),
    (err) => {
      err && console.error(err);
      console.log('successful');
    }
  );
  res.json({
    status: 'success',
    data: {
      product: data,
    },
  });
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log('server listening on ', PORT));
