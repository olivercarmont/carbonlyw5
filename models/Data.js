const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DataSchema = new Schema({
  name: {
    type: String,
  },
  data: {
    type: Object,
  }
});

module.exports = Data = mongoose.model("data", DataSchema);
