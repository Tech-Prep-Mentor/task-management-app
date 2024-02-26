import React from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li> <a href="#">Calendar</a> </li>
                <li> <a href="#">AI Assistant</a> </li>
                <li> <a href="#">Messaging</a> </li>
                <li> <a href="#">Whiteboard</a> </li>
            </ul>
        </nav>
    );
};

export default Navbar;