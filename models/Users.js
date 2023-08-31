const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  // password: String,
  collegeName: String,
  // otp: Number,
  profileImage: String,
});

module.exports = mongoose.model("users", UserSchema);
