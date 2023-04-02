const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    // validate(value) {
    //   if (value < 0) throw new Error("Empty Message Not Allowed.");
    // },
  },
  email: {
    type: String,
    required: true
    // validate(value) {
    //   if (value < 0) throw new Error("Empty Message Not Allowed.");
    // },
  }
});

const Suhail = mongoose.model("food", FoodSchema);

module.exports = Suhail;