const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema({
  category: {
    type: String,
  },
  title: {
    type: Object,
  },
  body: {
    type: String,
  },
  likes: {
    type: Array,
  },
  views: {
    type: Number,
  },
  comments: {
    type: Array,
  },
  link: {
    type: String,
  },
  date: {
    type: String,
  },
  author: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  altTags: {
    type: String,
  },
  isVideoBlog: {
    type: String,
  },
  videoLink: {
    type: String,
  },
  publishDate: {
    type: String,
  },
  tags: {
    type: Array,
  },
  authorDescription: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  authorLink: {
    type: String,
  }
});

module.exports = Blog = mongoose.model("blog", BlogSchema);
