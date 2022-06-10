const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    maxlength: [30],
    minlength: [4],
  },
  email: {
    type: String,
    required: [true],
    unique: true,
    validate: [validator.isEmail],
  },
  phone: {
    type: Number,
    maxlength: 10,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
    minlength: 100,
  },
});
module.exports = mongoose.model("Contact", contactSchema);
