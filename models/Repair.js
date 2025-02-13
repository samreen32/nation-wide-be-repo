const mongoose = require("mongoose");
const { Schema } = mongoose;

const repairSchema = new Schema({
  user_list: {
    firstname: { type: String },
    lastname: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  form_list: {
    model: { type: String },
    serialNum: { type: String },
    modelImage: { type: String },
    description: { type: String, },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Repair = mongoose.model("repairForm", repairSchema);
module.exports = Repair;