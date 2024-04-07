const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    messages: [
        {
      text: String,
      sender: { type: String, enum: ['user', 'ai'], required: true }, // Identifies who sent the message
      createdAt: { type: Date, default: Date.now }
        }
    ]
});

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
module.exports = ChatSession;