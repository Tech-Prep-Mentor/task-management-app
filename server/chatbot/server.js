const mongoose = require('mongoose');
const {general_chatbot, quiz_generate} = require('./controllers/gptController');
const {addUser, addChatSession, addMessage} = require('./controllers/chatbotController');

const express = require('express');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/chatbot')
.then( () => console.log('Connected to MongoDB') )
.catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/chatbot', general_chatbot)

app.get('/quiz', quiz_generate);

app.post('/register', addUser);

app.post('/chatbot', addChatSession);

app.patch('/chatbot/:username', addMessage);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});