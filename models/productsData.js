const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  sellerId: String,
  imageId: String,
  price: Number,
  description: String,
  category: String,
  contactNumber: Number,
  collegeName: String,
  ActiveStatus: String,
  SoldStatus: String,
});

module.exports = mongoose.model("product", productSchema);
