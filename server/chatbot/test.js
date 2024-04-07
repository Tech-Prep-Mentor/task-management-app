const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config();
const api_key = process.env.REACT_APP_API_KEY


const preprompt_json = fs.readFileSync("./preprompt.json");
const preprompt = JSON.parse(preprompt_json);

const quiz_tool_json = fs.readFileSync('./generate_quiz_tool.json')
const quiz_tool = JSON.parse(quiz_tool_json).tools;



// Print the JavaScript object
const openai = new OpenAI({
    apiKey: api_key,
})
async function main(prompt) {
    const messages = [{"role": "user", "content": "Help me generate one question only about the topic of electromagetism physics, college level. The first option must be the correct option. The follow three options must tbe wrong options "}];
    preprompt.push(messages[0])
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: preprompt,
        tools: quiz_tool,
        tool_choice: {"type": "function", "function": {"name": "generate_history_quiz"}},
    });

    const data = response.choices[0].message.tool_calls[0].function.arguments
    const data_json = JSON.parse(data)
    console.log(data_json)
}

main();

// load_json()