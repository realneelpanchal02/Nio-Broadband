const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // 🔥 duplicate block
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", StateSchema);
