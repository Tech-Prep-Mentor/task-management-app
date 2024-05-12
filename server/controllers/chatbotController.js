const User = require('../models/userModel.js');
const { ChatSession } = require('../models/chatSessionModel.js')

const addChatSession = async(req, res) => {
    try {
        console.log("Into addchatsession controller");
        userId = req.body.userId
        console.log(userId);
        user = await User.findById(req.body.userId);
        console.log("User: ", user)
        const chatSession = await ChatSession.create({ user: user, chatName: req.body.chatName, messages: [] });
        console.log("Created chat session");
        res.status(200).send(chatSession);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getMessage = async(req, res) => {
    console.log("Into getmessage")
    try {
        const chatSession = await ChatSession.findById(req.params.chatId);
        res.status(200).send(chatSession.messages);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addMessage = async(req, res) => {
    try {

        const chatSession = await ChatSession.findById(req.body.chatId);
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
        const userId = req.body.userId;
        const user = await User.findById(userId);
        const chatSession = await ChatSession.findOne({ user: user });
        chatSession.messages = [];
        await chatSession.save();
        res.status(200).send('Messages deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

const fetchChatSessions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        const chatSessions = await ChatSession.find({ user: user });
        const modifiedChatSessions = chatSessions.map(session => {
            return {
            _id: session._id,
            chatName: session.chatName
            };
        });
        res.status(200).send(modifiedChatSessions);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addChatSession,
    getMessage,
    addMessage,
    deleteMessages,
    fetchChatSessions,
};