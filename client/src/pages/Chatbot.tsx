import React, { useEffect, useState, useRef } from 'react';
import Chatbox from '../components/Chatbox';

interface OutputObject {
  message: string;
  sender: string;
}
const ENDPOINT = "http://localhost:3000/api/";
interface UserObject {
  name: string;
  email: string;
  token: string;
  id: string;
}

interface ChatRoom {
  _id: string;
  chatName: string;
}

function saveChat(chatId: string, sender: string, message: string) {
  const data = {
    chatId: chatId,
    message: [
      {
        text: message,
        sender: sender,
      }
    ]
  };

  fetch(`${ENDPOINT}chat`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data. Status:', response.status, 'Status Text:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function Chatbot() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<OutputObject[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatRoom | null>(null);
  const user: UserObject | null = JSON.parse(localStorage.getItem("user") || "null");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChatRooms(user.id);
    }
  }, []);

  const fetchChatRooms = async (userId: string) => {
    try {
      const response = await fetch(`${ENDPOINT}chat/sessions/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const rooms: ChatRoom[] = await response.json();
      setChatRooms(rooms);
      console.log("rooms: ", rooms);
      if (rooms.length > 0) {
        setCurrentChat(rooms[0]); // Automatically select the first room
      }
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };
  const createNewChatSession = async () => {
    if (!user) return;  // Ensuring there is a user logged in
  
    const newChatName = `Chat ${chatRooms.length + 1}`;  // Example of naming a new chat dynamically
    const requestBody = {
      userId: user.id,
      chatName: newChatName
    };
  
    try {
      const response = await fetch(`${ENDPOINT}api/chat/newchat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const newChatRoom: ChatRoom = await response.json();
        setChatRooms(prevRooms => [...prevRooms, newChatRoom]);
        setCurrentChat(newChatRoom); // Optionally set this as the current chat
        console.log('New chat session created:', newChatRoom);
      } else {
        console.error('Failed to create new chat session. Status:', response.status);
      }
    } catch (error) {
      console.error('Error creating new chat session:', error);
    }
  };

  const fetchChatHistory = async (chatId: string) => {
    if (!chatId) return;
    try {
      const response = await fetch(`${ENDPOINT}chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      const formattedData = data.map((item: any) => ({
        message: item.text,
        sender: item.sender
      }));
      setOutput(formattedData);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleChatSelection = (chatRoom: ChatRoom) => {
    setCurrentChat(chatRoom);
    fetchChatHistory(chatRoom._id);
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClick = async () => {
    if (!currentChat) return;

    setOutput(prevOutput => [...prevOutput, { message: input, sender: 'user' }]);
    saveChat(currentChat._id, 'user', input);
    setInput("");

    try {
      const response = await fetch(`${ENDPOINT}chat/aichat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: input, chat_history: output })
      });
      const data = await response.json();
      const chatbotResponse = { message: data.chatbot_message, sender: 'ai' };
      setOutput(prevOutput => [...prevOutput, chatbotResponse]);
      saveChat(currentChat._id, 'ai', data.chatbot_message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200">
      <div className="chat-sidebar">
        <ul>
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom._id}
                onClick={() => handleChatSelection(chatRoom)}
                className={`chat-room-item ${currentChat && currentChat._id === chatRoom._id ? 'active-room' : ''}`}>
              {chatRoom.chatName}
            </li>
          ))}
        </ul>

        <button onClick={createNewChatSession} className="mt-auto mb-4 mx-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Chat 
        </button>
      </div>
     
      {currentChat && (
        <div className="chat-main">
          <div className="message-area">
            {output.map((item, index) => (
              <Chatbox key={index} sender={item.sender} message={item.message} />
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          <form className="message-form">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="message-input"
              placeholder="Type your message here..."
            />
            <button type="button" onClick={handleClick} className="send-button">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
