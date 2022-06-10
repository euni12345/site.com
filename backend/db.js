const mongoose = require("mongoose");

module.exports = async () => {
 
  try {
    await mongoose.connect('mongodb://localhost:27017/agile');
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};
