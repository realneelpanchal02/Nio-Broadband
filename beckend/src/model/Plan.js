const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  speed: {
    type: String,
    required: true
  },
  date: {
  type: Date,
  required: true
}
},
 { timestamps: true } 
);

module.exports = mongoose.model("Plan", PlanSchema);
