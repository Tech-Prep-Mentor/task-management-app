// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Models
const User = require('./models/userModel'); // User model

// Routes
const userRoutes = require('./routes/userRoutes');
const messageChatRoutes = require('./routes/messageChatRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const imageRoutes = require('./routes/imageRoutes');

// Controllers
const { createMessage, createChat } = require('./controllers/messageChatController');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for development
        methods: ["GET", "POST"],
    },
});

// Middlewares for parsing JSON and handling CORS
app.use(cors());
app.use(express.json());

// Apply headers for CORS preflight requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Specific origin for CORS
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Respond with 200 for OPTIONS preflight
    } else {
        next();
    }
});

// Routes setup
app.use('/api/user', userRoutes);
app.use('/api', messageChatRoutes);
app.use('/api/images', imageRoutes)
app.use('/api/chat', chatbotRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/task-management-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// WebSocket configuration for real-time communication
io.use((socket, next) => {
    // Authentication middleware for WebSocket connections
    const token = socket.handshake.auth.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                return next(new Error('Authentication error'));
            }
            try {
                const user = await User.findById(decoded.id);
                if (!user) {
                    return next(new Error('Authentication error'));
                }
                socket.user = user;
                next();
            } catch (err) {
                next(new Error('Authentication Error'));
            }
        })
    } else {
        next(new Error('Authentication Error'));
    }
}).on('connection', (socket) => {
    // WebSocket events for chat functionality
    console.log('A user connected: ' + socket.id);

    // Join, message, and create chat room events
    socket.on('joinChatRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('newChatMessage', async(data) => {
        const newMessage = await createMessage(data);
        io.to(data.chatId).emit('chatMessage', {...data, senderName: newMessage.senderId.name });
    });

    socket.on('createChatRoom', async(roomDetails) => {
        try {
            const newRoom = await createChat({...roomDetails, requesterId: socket.user._id });
            io.emit('newChatRoom', newRoom);
        } catch (err) {
            socket.emit('errorCreatingChatRoom', { error: err.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));