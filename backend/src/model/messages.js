const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", messagesSchema);
module.exports = Message;