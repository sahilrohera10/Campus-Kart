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
  Login,
  sendmailforcontact,
  Deleteaccount,
  //   sendotpforgetpass,
  //   Forgotpassword,
  //   UpdatePassword,
  //   sendotpChangepassword,
  //   ChangePassword,
  getUserByEmailId,
  //   updateProfile,
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
      // return next();
    }

    const salt = await bcrypt.genSalt(10);
    const Secpassword = await bcrypt.hash(req.body.Password, salt);
    const votp = await otps.findOne({ emailid: req.body.Email });

    // console.log("votp->", votp.otp);

    const botp = req.body.otp;

    console.log({ botp });
    if (votp.otp === botp) {
      console.log("if check done");
      const data = await Users.create({
        email: req.body.Email,
        name: req.body.Name,
        password: Secpassword,
        collegeName: req.body.collegeName,
      });
      console.log("data entered :", data);
      res.status(200).json("register done");
      return next();
    } else {
      console.log("invalid otp");
      return res.status(303).json({ message: "Invalid Otp" });
    }
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function sendMAil(req, res, next) {
  try {
    const val = Math.floor(1000 + Math.random() * 9000);
    const user = await otps.find({ emailid: req.body.Email });
    // if (!user) {
    await otps.create({
      emailid: req.body.Email,
      otp: val,
    });
    console.log("here");
    // } else {
    //   await otps.updateOne({ emailid: req.body.Email }, { otp: val });
    //   console.log("there");
    // }

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

    // console.log("data entered : ", data);

    // return res.status(200).json({ message: "mail sent succesfully" });
  } catch (error) {
    console.log("error : ", error);
    return res.status(400).json({ message: error });
  }
}

async function Login(req, res, next) {
  const { Email, Password } = req.body;
  console.log("user email", Email);
  console.log("user password", Password);
  if (!Email || !Password)
    return res
      .status(400)
      .json({ message: "Please provide email and password " });
  console.log("still on");

  try {
    const User = await Users.findOne({ email: Email });

    if (!User) {
      console.log("No user exist with this email.");
      return res.status(401).json({ message: "No user exist with this email" });
    }
    const pass = await Users.findOne({ email: Email });
    // console.log("pass->",pass);
    // console.log("password->",pass.password);
    if (!bcrypt.compareSync(Password, pass.password)) {
      return res.status(402).json({ message: "Password Incorrect" });
    } else {
      // const data = await Users.findAll({ where: { email: req.body.Email } });
      // console.log("Login Successfully done now", User);
      return res.status(200).json({ pass });
    }

    // return next();
  } catch (err) {
    console.log("Error in getUsers : ", err);
    return res.status(400).json(err);
  }
}

async function sendmailforcontact(req, res, next) {
  // const val = Math.floor(1000 + Math.random() * 9000);

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
    // console.log(text);

    tranporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log("send");
        res.send("success");
      }
    });

    // console.log("data entered : ", data);

    return res.status(200).json("mail sent succesfully");
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function Forgotpassword(req, res, next) {
  // const { Email, Password } = req.body;

  try {
    // const User = await Users.findOne({where:{email:Email}})

    const botp = await Users.findOne({ where: { email: req.body.Email } });
    // console.log(botp.otp);
    if (req.body.otp == botp.otp) {
      return res.status(400).json({ message: "correct otp" });
    } else {
      console.log("wrong OTP");
      return res.json("Wrong OTP");
    }

    return next();
  } catch (err) {
    console.log("Error : ", err);
    res.status(404).json(err);
  }
}

async function sendotpforgetpass(req, res, next) {
  const val = Math.floor(1000 + Math.random() * 9000);

  try {
    const user = await Users.findOne({ where: { email: req.body.Email } });
    if (!user) {
      console.log("No email exists");
      return res.json("No such email exists");
    } else {
      const tranporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "sahilaroraji2002@gmail.com",
          pass: "iuppwqxpqnkoithv",
        },
      });

      const mailOptions = {
        from: "sahilaroraji2002@gmail.com",
        to: req.body.Email,
        subject: "otp for Forgot Password",
        text: `please enter this otp ${val} from your given email id.`,
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

      await Users.update(
        { otp: val },
        {
          where: {
            email: req.body.Email,
          },
        }
      );
    }

    // console.log("data entered : ", data);

    res.status(200).json("mail sent succesfully");
    return next();
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

async function UpdatePassword(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const Secpassword = await bcrypt.hash(req.body.Password, salt);
  try {
    const data = await Users.update(
      { password: Secpassword },
      {
        where: { email: req.body.Email },
      }
    );
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function sendotpChangepassword(req, res, next) {
  const val = Math.floor(1000 + Math.random() * 9000);

  try {
    const tranporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "sahilaroraji2002@gmail.com",
        pass: "iuppwqxpqnkoithv",
      },
    });

    const mailOptions = {
      from: "sahilaroraji2002@gmail.com",
      to: req.body.Email,
      subject: "otp for Change Password",
      text: `please enter this otp ${val} from your given email id.`,
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

    await otp.update(
      { otp: val },
      {
        where: {
          emailid: req.body.Email,
        },
      }
    );

    // console.log("data entered : ", data);

    res.status(200).json("mail sent succesfully");
    return next();
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function ChangePassword(req, res, next) {
  try {
    // const User = await Users.findOne({where:{email:Email}})

    const botp = await otp.findOne({ where: { emailid: req.body.Email } });
    // console.log(botp.otp);
    if (req.body.otp == botp.otp) {
      return res.status(400).json({ message: "correct otp" });
    } else {
      console.log("wrong OTP");
      return res.json("Wrong OTP");
    }

    return next();
  } catch (err) {
    console.log("Error : ", err);
    res.status(404).json(err);
  }
}
