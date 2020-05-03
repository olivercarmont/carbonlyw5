const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
  type: {
    type: String,
  },
  data: {
    type: Object,
  }
});

module.exports = Form = mongoose.model("form", FormSchema);
