const chatSessionModel = require('../models/chatSessionModel.js');
const userModel = require('../models/userModel.js');


const addUser = async (req, res) => {
    try {
     const {username, displayName} = req.body;
     const user = await userModel.create({username, displayName});
     res.status(200).send(user);
    } catch (error) {
      res.status(500).send('Server error');
    }
}

const addChatSession = async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.body.username});
        const messages = req.body.messages;
        const ChatSession = await chatSessionModel.create({user: user, messages: messages});
        res.status(200).send(ChatSession);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const addMessage = async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.params.username});
        const chatSession = await chatSessionModel.findOne({user: user});
        const newMessage = {
            text: req.body.message[0].text,
            sender: req.body.message[0].sender
        };
        chatSession.messages.push(newMessage);
        await chatSession.save();
        res.status(200).send(chatSession);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addUser,
    addChatSession,
    addMessage
}