const express = require('express');
const { getChatGPTResponse } = require('../controllers/chatgptController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/chat', authMiddleware, getChatGPTResponse);

module.exports = router;
