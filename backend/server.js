const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION');
  console.log(err);
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './.env' });

const DB_URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.PASSWORD
);

mongoose.connect(DB_URL).then((conn) => {
  console.log('DB connected');
});

const PORT = process.env.PORT || 8888;

const server = app.listen(PORT, () =>
  console.log('server listening on ', PORT)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION');
  console.log(err);
  server.close(() => process.exit(1));
});
