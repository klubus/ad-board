const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      required: true,
      default: '',
    },
    phone: {
      type: String,
      match: /^[0-9+\-\s()]{6,20}$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
