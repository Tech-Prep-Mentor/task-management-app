import React from 'react';
import './navbar.css';

const Navbar = () => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };


  return (
    <div className="navbar-container">
      <nav>
        <ul>
          <li onClick={() => handleNavigation('/calendar')}>Calendar</li>
          <li onClick={() => handleNavigation('/chatbot')}>AI Assistant</li>
          <li onClick={() => handleNavigation('/messaging')}>Messaging</li>
          <li onClick={() => handleNavigation('/whiteboard')}>Whiteboard</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;