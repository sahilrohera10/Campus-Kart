const otps = require("../models/otp");
// const { users } = require("../../models/users");
const Users = require("../models/Users");
const express = require("express");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const { ObjectID } = require("bson");
module.exports = {
  Register,
  sendMAil,
  sendmailforcontact,
  Deleteaccount,
  getUserByEmailId,
};

async function updateProfile(req, res, next) {
  try {
    const data = await Users.update(
      { name: req.body.name, email: req.body.email },
      {
        where: { id: req.body.id },
      }
    );
    return res.status(200).send("update successfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function getUserByEmailId(req, res, next) {
  try {
    const data = await Users.findOne({ email: req.params.emailId });
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error => ", error);
    return next(error);
  }
}

async function Register(req, res, next) {
  try {
    const user = await Users.findOne({ email: req.body.Email });
    if (user) {
      console.log(" Already registered ");
      return res.status(300).json({ message: "already registered" });
    }
      const data = await Users.create({
        email: req.body.Email,
        name: req.body.Name,
        profileImage:req.body.ProfileImage
      });
      console.log("data entered :", data);
      const responseObj = {
        message: 'register done',
        id: data._id,
      };
      res.status(200).json(responseObj);
      return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function sendMAil(req, res, next) {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    const user = await otps.find({ emailid: req.body.Email });
    await otps.create({
      emailid: req.body.Email,
      otp: val,
    });
    console.log("here");

    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "contact.technomaits@gmail.com",
        pass: "qhtpgbivqupkszzf",
      },
    });

    const mailOptions = {
      from: "contact.technomaits@gmail.com",
      to: req.body.Email,
      subject: "CAMPUS KART - otp for user verification",
      text: `please enter this otp ${val} with your given email id.`,
    };

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ message: error });
  }
}



async function sendmailforcontact(req, res, next) {
  try {
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "campuskart05@gmail.com",
        pass: "tbiqxiuxllqrzviu",
      },
    });

    const mailOptions = {
      from: req.body.Email,
      to: "campuskart05@gmail.com",
      subject: `${req.body.name} wants to contact from ${req.body.Email}`,
      text: req.body.message,
    };
    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });
    return res.status(200).json("mail sent succesfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function Deleteaccount(req, res, next) {
  try {
    const id = ObjectID(req.params.id);
    await Users.deleteOne({ _id: id });
    return res.status(200).json({ message: "account deleted successfully" });
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}






