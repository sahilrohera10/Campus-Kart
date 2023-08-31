const express = require("express");
const message = require("../Controller/MessageController.js");

const router = express.Router();

router.post("/", message.addMessage);
router.get("/:chatId", message.getMessages);

module.exports = router;
