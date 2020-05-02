const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DataSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

module.exports = Data = mongoose.model("data", UserSchema);
