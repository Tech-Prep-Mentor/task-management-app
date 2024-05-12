import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const AiTutor = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200">
      <div className="app-container max-w-4xl w-full shadow-xl rounded-lg overflow-hidden">
        <header className="header bg-blue-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">Study Guide App</h1>
          <p className="text-white text-opacity-90 mt-1">Enhance your learning with our interactive tools.</p>
        </header>
        <main className="main flex flex-col items-center p-10 bg-white space-y-5">
          <Link to="/aitutor/quiz" className="btn quiz-btn bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Quiz Generator
          </Link>
          <Link to="/aitutor/chatbot" className="btn chat-btn bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Chat Bot
          </Link>
        </main>
        <footer className="bg-gray-100 p-4 text-center text-sm">
          © {new Date().getFullYear()} Study Guide App, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AiTutor;
