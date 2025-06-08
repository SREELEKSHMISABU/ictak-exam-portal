const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String, // 'student' or 'admin'
  eligible: Boolean // only eligible students can log in
});

module.exports = mongoose.model('User', userSchema);
