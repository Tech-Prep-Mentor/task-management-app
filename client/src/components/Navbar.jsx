import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext';

const Navbar = () => {
    const [buttonState, setButtonState] = useState(false); // Toggle for mobile menu
    const { user, logout } = useUser();

    const toggleButtonState = () => {
        setButtonState(!buttonState);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">
                        <Link to="/">SWE1</Link>
                    </div>
                    <div className="md:flex hidden space-x-6 items-center">
                        <Link to="/" className="text-lg text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
                        <Link to="/aitutor" className="text-lg text-gray-600 hover:text-blue-600 transition duration-300">AI Tutor</Link>
                        <Link to="/chat" className="text-lg text-gray-600 hover:text-blue-600 transition duration-300">Chat</Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-800">Welcome, {user.name}</span>
                                <button onClick={logout} className="py-2 px-6 text-white bg-red-500 rounded hover:bg-red-600 transition duration-300">
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="py-2 px-6 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300">Sign In</Link>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleButtonState} className="text-gray-600 focus:outline-none">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={buttonState ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`md:hidden ${buttonState ? 'block' : 'hidden'} absolute w-full bg-white shadow-md py-4`}>
                <Link to="/" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Home</Link>
                <Link to="/login" className="block py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Sign In</Link>
                {user && (
                    <button onClick={logout} className="w-full py-2 text-gray-700 hover:bg-gray-100 text-center transition duration-300">Log Out</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
