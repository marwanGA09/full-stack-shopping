const app = require('./app');

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log('server listening on ', PORT));
