const Forum = require("../models/forum");
const express = require("express");

async function AddForum(req, res, next) {
  try {
    const data = await Forum.create({
      request: req.body.request,
      name: req.body.name,
    });
    console.log(data);
    return res.status(200).json("Request added succesfully");
  } catch (error) {
    console.log("Error : ", error);
    return res.status(404).json(error);
  }
}

async function GetAllForum(req, res, next) {
  try {
    const data = await Forum.find();
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    console.log("Error : ", error);
    return res.status(404).json(error);
  }
}

module.exports = {
  AddForum,
  GetAllForum,
};
