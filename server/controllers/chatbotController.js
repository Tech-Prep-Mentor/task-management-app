const bcrypt = require('bcrypt');
const { User } = require('../models/userModel.js');
const { ChatSession } = require('../models/chatSessionModel.js')

const addChatSession = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log("User: ", user)
        console.log(user)
        const chatSession = await ChatSession.create({ user: user, messages: [] });
        console.log("Created chat session");
        res.status(200).send(chatSession);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getMessage = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const chatSession = await ChatSession.findOne({ user: user });
        res.status(200).send(chatSession.messages);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addMessage = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log(user)
        const chatSession = await ChatSession.findOne({ user: user });
        const newMessage = {
            text: req.body.message[0].text,
            sender: req.body.message[0].sender
        };
        chatSession.messages.push(newMessage);
        await chatSession.save();
        res.status(200).send(chatSession);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteMessages = async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const chatSession = await ChatSession.findOne({ user: user });
        chatSession.messages = [];
        await chatSession.save();
        res.status(200).send('Messages deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    addChatSession,
    getMessage,
    addMessage,
    deleteMessages
};