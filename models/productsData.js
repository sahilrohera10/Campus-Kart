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
  SoldStatus:{
    type:Boolean ,
    default:false ,
  },
  newly_added: {
    type: Boolean,
    default: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  featured_product: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("product", productSchema);
