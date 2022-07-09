const Wishlist = require("../models/wishlist.js");
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function AddprodinWishlist(req, res, next) {
  try {
    const productId = ObjectId(req.body.productId);
    const customerId = ObjectId(req.body.customerId);
    const user = await Wishlist.findOne({
      productId: productId,
      customerId: customerId,
    });
    if (user) {
      console.log("Product Already added in Your Wishlist ");
      return res.status(300).json("product already added");
      // return next();
    } else {
      const data = await Wishlist.create({
        customerId: customerId,
        productId: productId,
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        imgId: req.body.imgId,
        category: req.body.category,
        contactNumber: req.body.contactNumber,
      });
      console.log("product entererd in wishlist :", data);
      return res.status(200).json("product added");
    }
  } catch (err) {
    console.log("Error in getUsers : ", err);
    return res.status(400).json(err);
  }
}

async function getprodfromwishlist(req, res, next) {
  try {
    const Id = ObjectId(req.params.id);
    const data = await Wishlist.find({ customerId: Id });

    return res.status(200).json(data);
  } catch (err) {
    console.log("Error : ", err);
    return res.status(404).json(err);
  }
}

async function deleteprodfromwishlist(req, res, next) {
  try {
    const customerId = ObjectId(req.params.cid);
    const productId = Object(req.params.pid);
    await Wishlist.deleteOne({ customerId: customerId, productId: productId });

    return res.status(200).json("product delete");
  } catch (err) {
    console.log("Error : ", err);
    return res.status(404).json(err);
  }
}

module.exports = {
  AddprodinWishlist,
  getprodfromwishlist,
  deleteprodfromwishlist,
};
