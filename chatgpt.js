const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI("AIzaSyBWfmhPdVKQkCWDmqfni0Ff4h9KkBscl44");


// require('dotenv').config();



const generateResponse = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            prompt]
        );
        return result.response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        throw new Error('Failed to generate response');
    }
};

module.exports = { generateResponse };
