const mongoose = require("mongoose") ;
const ForumSchema = new mongoose.Schema({
    name: String,
    request: String,
    
  });
  module.exports = mongoose.model("Forum", ForumSchema);