const router = require("express").Router();
const {
  createChat,
  userChat,
  findChat,
} = require("../Controller/ChatController.js");

// const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChat);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
