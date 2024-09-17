// models/ConversationHistory.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  cookieId: {
    type: String,
    required: true,
    unique: true,
  },
  history: [
    {
      role: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const ConversationHistory = mongoose.model('ConversationHistory', conversationSchema);

module.exports = ConversationHistory;
