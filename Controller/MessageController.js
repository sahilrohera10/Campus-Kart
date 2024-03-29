const MessageModel = require("../models/Messages");

module.exports = {
  addMessage,
  getMessages,
};

async function addMessage(req, res) {
  const { chatId, senderId, text } = req.body;
  console.log(req.body);
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getMessages(req, res) {
  const { chatId } = req.params;

  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json(error);
  }
}
