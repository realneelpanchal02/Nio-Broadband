const mongoose = require('mongoose');

const AdminLoginSchema = new mongoose.Schema({
  adminemailid: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

const AdminLogin = mongoose.model('AdminLogin', AdminLoginSchema);

module.exports = AdminLogin;

