const mongoose = require('mongoose');

// console.log({
// 	DB_USER: process.env.DB_USER,
// 	DB_PASS: process.env.DB_PASS,
// 	DB_HOST: process.env.DB_HOST,
// 	DB_PORT: process.env.DB_PORT,
// 	DB_NAME: process.env.DB_NAME,
//   });

mongoose.connect('mongodb://localhost:27017/BragDoc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;