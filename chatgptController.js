const {generateResponse} = require('../chatgpt');

const getChatGPTResponse = async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await generateResponse(prompt);
        res.json({ status: 'success', response: response });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = { getChatGPTResponse };
