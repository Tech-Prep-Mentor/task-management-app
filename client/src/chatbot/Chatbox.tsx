
import React from 'react';

interface ChatboxProps {
    target: string;
    message: string;
  }
  

function Chatbox({target, message}: ChatboxProps){
    return (
        <div className='my-4'>
            <p className='bg-blue-100 text-blue-800 p-4 rounded-lg shadow'>{target}: {message}</p>
        </div>
    )
}

export default Chatbox;