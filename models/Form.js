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
  time: {
    type: String,
  },
  link: {
    type: String,
  }, 
  product: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  emissions: {
    type: String,
  },
  formId: {
    type: String
  },
  name: {
    type: String
  },
  usersAnswered: {
    type: Array
  },
  answerType: {
    type: Boolean
  },
  faqQuestions: {
    type: Array,
  }
});

module.exports = Form = mongoose.model("form", FormSchema);
