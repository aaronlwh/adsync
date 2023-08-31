const mongoose = require('mongoose');

mongoose.connect('process.env.MONGODB_CONNECTION_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

module.exports = db;