import React, {useState} from 'react';
import McqBtn from '../components/McqBtn';
interface FetchedQuestion {
    topic: string[];
}

interface QuizObject {
    question: string; 
    answers: string[];
    correctAnswer: string;
}

const fetchQuestion = async (topic: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/chat/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_question: topic})
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Data fetched successfully');
            return data;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status} Status Text: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


function QuizGenerator(){
    const [input, setInput] = useState("");
    const [questions, setQuestions] = useState<QuizObject[]>([]);

    const handleSubmit = async () => {
        const fetchedQuestion = await fetchQuestion(input) as unknown as FetchedQuestion;

        if (fetchedQuestion) {
            const question = {
                question: fetchedQuestion.topic[0][0],
                answers: [fetchedQuestion.topic[0][1], fetchedQuestion.topic[0][2], fetchedQuestion.topic[0][3], fetchedQuestion.topic[0][4]],
                correctAnswer: fetchedQuestion.topic[0][1],
            }
            setQuestions([question]);

        }
    }


    


    return (
        <div className="my-4 ml-2">
            <h1 className="text-2xl font-bold mb-4">This is QuizGenerator</h1>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 py-2 px-4 rounded"
                onClick={handleSubmit}
            >
                Send
            </button>
            

            {questions.length > 0 && (
                

                <div className="flex flex-col">
                    <div className="bg-blue-100 my-3 mx-8 p-4 rounded-md mb-4 text-center">
                        {questions[0].question}
                    </div>

                    {questions[0].answers.map((question, index) => (
                        <McqBtn 
                            key={index}
                            answer={question}
                            isTrue={index === 0} 
                        />
                    ))}
                </div>
            )}
        </div>
    )


}


export default QuizGenerator;