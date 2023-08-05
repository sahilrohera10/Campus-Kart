const mongoose = require("mongoose") ;
 
const WishlistSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Reference to the User model for seller
      },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
      },
  
}) ;
module.exports = mongoose.model("Wishlist", WishlistSchema);