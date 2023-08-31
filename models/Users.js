const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  email_is_verified: {
    type: Boolean,
    default: false,
  },
  hashedPassword: String,
},{
  database: 'Adsync',
  collection:'users'
});

const User = mongoose.model('User', userSchema);
module.exports = User;