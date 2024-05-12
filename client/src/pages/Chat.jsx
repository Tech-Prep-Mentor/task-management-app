import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CreateChatRoom from '../components/CreateChatRoom';
import { useUser } from '../context/userContext';
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import ChatboxUser from '../components/ChatboxUser';
import ImageUploader from '../components/ImageUploader';

const ENDPOINT = 'http://localhost:3000';

function ChatPage() {
  //Keep track of state
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState({ id: '', name: '' });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (!user.token) return;

    // Initializa socket connection
    socket.current = socketIOClient(ENDPOINT, {
      auth: { token: user.token },
      transports: ['websocket'],
    });

    //Listen for chatMessage event
    socket.current.on('chatMessage', (newMessage) => {
      if (newMessage.chatId === currentChat.id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    //Listen for new chat room event
    socket.current.on('newChatRoom', (newChatRoom) => {
      setChatRooms((prevChatRooms) => [...prevChatRooms, newChatRoom]);
    })

    return () => socket.current.disconnect();
  }, [currentChat.id]);

  useEffect(() => {
    if (user?.id) fetchChats();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to fetch chats
  const fetchChats = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${ENDPOINT}/api/users/${user.id}/chats`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setChatRooms(data.chats);
      setError('');
    } catch (err) {
      setError('Failed to load chats. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (imageUrl) => {
    const messageData = {
      content: imageUrl,
      senderId: user.id,
      chatId: currentChat.id,
      type: 'image'  // Distinguish between text and image messages
    };
    if (socket.current) {
      socket.current.emit('newChatMessage', messageData);
    }
  };



  // Function to handle chat selection
  const handleChatSelection = async (chatRoom, e) => {
    e?.preventDefault(); 
    setCurrentChat({ id: chatRoom._id, name: chatRoom.name });
    fetchMessages(chatRoom._id);
  };


  // Function to fetch messages
  const fetchMessages = async (chatId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${ENDPOINT}/api/chats/${chatId}/messages`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMessages(data.messages);
      socket.current.emit('joinChatRoom', chatId); // Join chat room
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle sending message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = {
        content: message,
        senderId: user.id,
        chatId: currentChat.id
      };
      socket.current.emit('newChatMessage', messageData);
      setMessage('');
    }
  };

  if (isLoading) return <div>Loading chats...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div className="chat-container bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200">
    <div className="chat-sidebar">
      <div className="sidebar-header">Rooms</div>
      <CreateChatRoom socket={socket.current} />
      {chatRooms.length === 0 ? (
        <div className="sidebar-no-rooms">No chat rooms available.</div>
      ) : (
        <ul className="chat-room-list">
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom._id} onClick={(e) => handleChatSelection(chatRoom, e)}
                className={`chat-room-item ${currentChat.id === chatRoom._id ? 'active-room' : ''}`}>
              {chatRoom.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="chat-main">
      <header className="chat-header">{currentChat.name}</header>
      <div className="message-area">
        {messages.map((msg, index) => (
          <ChatboxUser 
            key={index} 
            sender={msg.senderId._id === user.id || msg.senderId === user.id ? 'user' : 'other'}
            senderName={msg.senderName || msg.senderId.name} 
            content={msg.content}
          />
        ))}
        {/* This empty div will be used to scroll to the latest message */}
        <div ref={messagesEndRef} />
      </div>


      
      {currentChat.id && ( 
      <>
            <form className="message-form" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input" />
            <button type="submit" className="send-button">Send</button>
          </form>
          </>
      )}
    </div>
  </div>
);

}

export default ChatPage
