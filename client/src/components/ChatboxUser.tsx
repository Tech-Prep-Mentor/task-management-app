import React from 'react';

interface ChatboxUserProps {
  sender: string;
  senderName: string;
  content: string;
}

const ChatboxUser: React.FC<ChatboxUserProps> = ({ sender, senderName, content }) => {
  const isUserMessage = sender === 'user';

  // Helper function to determine if the content is an image URL
  const isImageUrl = (content: string): boolean => {
    return /\.(jpeg|jpg|gif|png)$/.test(content.toLowerCase());
  };

  // Render either an image or text based on the content
  const renderContent = () => {
    if (isImageUrl(content)) {
      return <img src={content} alt="User content" className="max-w-xs max-h-64" />; // Constraints to prevent very large images
    }
    return content;
  };

  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`flex flex-col max-w-2xl`}>
        {!isUserMessage && (
          <div className="text-xs font-semibold text-gray-600">{senderName}</div>
        )}
        <div
          className={`inline-block mt-1 px-4 py-2 rounded-lg shadow-lg ${
            isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ChatboxUser;
