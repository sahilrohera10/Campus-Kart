const express = require("express");
const chat = require("../Controller/ChatController.js");

const router = express.Router();

router.post("/", chat.createChat);
router.get("/:userId", chat.userChat);
router.get("/find/:firstId/:secondId", chat.findChat);

module.exports = router;
