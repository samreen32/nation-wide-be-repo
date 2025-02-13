const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://iamsamreenk:oEVqrZ8bwH3JzMs2@cluster0.jxybe.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongoose Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;