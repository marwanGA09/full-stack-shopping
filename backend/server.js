const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const DB_URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.PASSWORD
);

mongoose.connect(DB_URL).then((conn) => {
  console.log('DB connected');
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log('server listening on ', PORT));
