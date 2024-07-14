const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const modelRoutes = require('./routes/modelRoutes');
const chatgptRoutes = require('./routes/chatgptRoutes');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/chatgpt', chatgptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
