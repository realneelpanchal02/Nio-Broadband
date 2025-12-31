const mongoose = require('mongoose');

const Engineer_Schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true }, // ya Date type
  pincode: { type: String, required: true, trim: true },
}, {
  timestamps: true,
});


 const engineerSchema= mongoose.model('engineer_detail',Engineer_Schema);

 module.exports =engineerSchema;

