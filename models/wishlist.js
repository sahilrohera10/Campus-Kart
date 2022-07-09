const mongoose = require("mongoose") ;
 
const WishlistSchema = new mongoose.Schema({
    customerId:String,
    productId:String,
    productName: String,
    description: String,
    price: Number,
    imgId:String,
    category: String,
    contactNumber: Number,
    SoldStatus: String,
}) ;
module.exports = mongoose.model("Wishlist", WishlistSchema);