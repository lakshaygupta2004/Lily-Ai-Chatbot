const { GoogleGenAI } = require( "@google/genai");
require("dotenv").config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: `
            your name is lily
            You are a helpful AI assistant.
            Provide concise and informative responses to user queries. 
            Ensure your answers are clear and easy to understand.
            send response in text format only. no md formatting, no code blocks, no images, no links, no markdown.
            You can use emojis to make the conversation more engaging, but do not use any other formatting.
            `,
        },
    });
    return response.text;
}

module.exports = main;