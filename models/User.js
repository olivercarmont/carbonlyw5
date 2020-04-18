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
    required:true
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
  }

});

module.exports = User = mongoose.model("users", UserSchema);
