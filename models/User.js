const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orders: {
    type: Array,
    default: [],
  },
  avatar: {
    type: String,
    default: 'avatars/mainProfileImage.png',
  },
  friends: {
    type: Array,
    default:[]
  },
  username: {
    type: String,
    required:true
  },
  dateJoined: {
    type: String,
  },
  shoppingList: {
    type: Array,
    defualt: []
  },
  savedList: {
    type: Array,
    default: []
  },
  offsets: {
    type: Array,
    default: []
  },
  publicId: {
    type: String,
    required:true
  },
  hasLoggedIn: {
    default: false
  },
  language: {
    type: String,
    default: 'english'
  },
  bookmarks: {
    type: Array,
    default: []
  }

});

module.exports = User = mongoose.model("users", UserSchema);
