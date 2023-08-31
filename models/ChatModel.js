const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Chat", chatSchema);
// export default chatModel;
