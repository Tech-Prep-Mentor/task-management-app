import React, {useState} from 'react';


function QuizGenerator(){
    const [input, setInput] = useState("");

    interface OutputObject {
        message: string; 
        target: string;
      }

    
      const [output, setOutput] = useState<OutputObject[]>([]);
      


    return (
        <div>
            <h1>This is QuizGenerator</h1>
            <button 
            className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Send
            </button>

            
        </div>
    )


}


export default QuizGenerator;