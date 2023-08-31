const ChatModel = require("../models/chatModel");

module.exports = {
  createChat,
  userChat,
  findChat,
};

async function createChat(req, res) {
  const si = req.body.senderId;
  const ri = req.body.receiverId;
  // console.log("body=>", req.body);
  const user = await ChatModel.find({ members: { $all: [si, ri] } });
  if (user.length) {
    console.log("user found=>", user);
    return res.status(409).json({ message: "already done" });
  }
  console.log("heii");
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function userChat(req, res) {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function findChat(req, res) {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
}
