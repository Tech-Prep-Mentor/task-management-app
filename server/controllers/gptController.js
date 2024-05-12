const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');

require('dotenv').config({path: dotenvPath});
const api_key = process.env.OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: api_key,
    dangerouslyAllowBrowser: true
})



const general_chatbot = async (req, res) => {
    const { user_message, chat_history } = req.body;
    let chatbot_prompts = chat_history.map((chat) => {
        return {
            role: chat.target === 'ai' ? 'assistant' : 'user',
            content: chat.message,
        };
    });
    
    chatbot_prompts.push({ role: "system", content: "You are a study assistant, please provide support for users to learn"});
    chatbot_prompts.push({ role: "user", content: user_message});
    console.log(chatbot_prompts)
    

    const completion = await openai.chat.completions.create({
        messages: chatbot_prompts,
        model: "gpt-3.5-turbo",
    });

    const response_text = completion.choices[0].message.content
    if (response_text){
        chatbot_prompts.push({role: "assistant", content: response_text})
        res.status(200).json({chatbot_message: response_text})
    }
    else{
        res.status(400).json({error: "Receive response unsucessfully from API"})
    }
}

const quiz_generate = async (req, res) => {
    const { user_question } = req.body;
    let filePath = path.join(__dirname, '/preprompt.json');
    const preprompt_json = fs.readFileSync(filePath, 'utf8');
    const preprompt = JSON.parse(preprompt_json);  

    filePath = path.join(__dirname, '/generate_quiz_tool.json');
    const quiz_tool_json = fs.readFileSync(filePath, 'utf8')
    const quiz_tool = JSON.parse(quiz_tool_json).tools;

    const messages = {"role": "user", "content": `Help me generate one question only about the topic of ${user_question}. The first option must be the correct option. The follow three options must tbe wrong options `};
    preprompt.push(messages)


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: preprompt,
        tools: quiz_tool,
        tool_choice: {"type": "function", "function": {"name": "generate_quiz"}},
    });

    const data = response.choices[0].message.tool_calls[0].function.arguments;
    if (data){
        const quiz = JSON.parse(data); // already a js object
        res.status(200).json(quiz);
    }
    else{
        res.status(400).json({error: "Receive response unsucessfully from API"})
    
    }

}



module.exports = {general_chatbot, quiz_generate};
