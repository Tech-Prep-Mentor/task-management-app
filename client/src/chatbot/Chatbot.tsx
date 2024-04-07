import React, {useState} from 'react';
import {general_assist} from '../../../server/chatbot/chatbot_helper';
import Chatbox from './Chatbox';



function Chatbot() {
    const [input, setInput] = useState("");

    interface OutputObject {
        message: string; 
        target: string;
      }

    const [output, setOutput] = useState<OutputObject[]>([]);

    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }
    const handleClick = async () => {
        console.log('button clicked');
        setOutput((prevOutput) => [...prevOutput, {message: input, target: 'user'}])
        setInput("");
        const response = await general_assist(input);
        
        setOutput((prevOutput) => [...prevOutput, {message: response, target: 'bot'}])
      };

  return (
    <div className='m-6'>
      <input
        className='form-input px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md shadow-sm w-full'
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type your message here..."
      />
      <button 
      onClick={handleClick} 
      className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Send
      </button>
      {output.map((item, index) => (
      <Chatbox key={index} target={item.target} message={item.message} />)
      )}

    </div>
  );
}

export default Chatbot;
