const mongoose = require("mongoose");

/*
====================================
 Admin Register / Login Schema
====================================
*/

const RegisterSchema = new mongoose.Schema(
  {
    // Full Name
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Gender
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Address
    address: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // City
    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Password
    password: {
      type: String,
      required: true,
      trim: true,
    },

    // Date of Birth
    dob: {
      type: String, // Can also be Date
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
====================================
 Model Export
====================================
*/

const Register = mongoose.model("Register", RegisterSchema);
module.exports = Register;
