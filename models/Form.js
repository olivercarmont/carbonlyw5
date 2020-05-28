const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FormSchema = new Schema({
  type: {
    type: String,
  },
  data: {
    type: Object,
  },
  link: {
    type: String,
  },
  link: {
    type: String,
  }, product: {
    type: String,
  }, productCategory: {
    type: String,
  }, emissions: {
    type: String,
  }
});

module.exports = Form = mongoose.model("form", FormSchema);
