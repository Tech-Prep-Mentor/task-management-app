const express = require('express');
const router = express.Router();

const { general_chatbot, quiz_generate, } = require('../controllers/gptController');
const { addChatSession, getMessage, addMessage, deleteMessages, fetchChatSessions } = require('../controllers/chatbotController');



// Chatbot and quiz routes
router.post('/aichat', general_chatbot);
router.post('/quiz', quiz_generate);

// User authentication and message handling routes

// default: "/api/chat"
router.post('/newchat', addChatSession);
router.patch('/', addMessage);
router.get('/:chatId', getMessage); // get messages from chatid
router.delete('/', deleteMessages);
router.get('/sessions/:userId', fetchChatSessions);


module.exports = router;