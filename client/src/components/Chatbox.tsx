import React from 'react';
import { marked } from 'marked'; // Adjusted import

interface ChatboxProps {
  sender: string;
  message: string;
}

function Chatbox({ sender, message }: ChatboxProps) {
  const isUserMessage = sender === 'user';
  const senderLabel = isUserMessage ? "User" : "AI Tutor";

  const getFormattedMessage = (): { __html: string } => {
    const rawMarkup = marked.parse(message) as string; // Type assertion
    return { __html: rawMarkup };
  };

  return (
    <div className={`my-4 flex flex-col ${isUserMessage ? 'items-end' : 'items-start'}`}>
      <div className={`text-xs font-semibold px-2 py-1 rounded-full ${isUserMessage ? 'bg-blue-300 text-white' : 'bg-green-300 text-white'}`}>
        {senderLabel}
      </div>
      <div
        className={`inline-block mt-1 px-4 py-2 rounded-lg shadow-lg ${isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        dangerouslySetInnerHTML={getFormattedMessage()}
      ></div>
    </div>
  );
}

export default Chatbox;
