const Analysis = require('../models/analysisModel');
const multer = require('multer');
const path = require('path');
const {generateResponse} = require('../chatgpt');


const upload = multer({
    dest: 'uploads/'
});

// Analyze single URL
const analyzeUrl = async (req, res) => {
    const { url } = req.body;
    const { id: userId } = req.user;

    try {
        const prompt = `Analyze the following URL for malicious content and safe or not: ${url}`;
        const analysisResult = await generateResponse(prompt);

        const newAnalysis = new Analysis({ url, analysisResult, user: userId });
        await newAnalysis.save();

        res.status(201).json({ status: 'success', analysisId: newAnalysis._id, analysisResult });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error analyzing URL' });
    }
};

const analyzeUrlDataset = async (req, res) => {
    const filePath = req.file.path;
    const { id: userId } = req.user;

    try {
        const urls = await readUrlsFromFile(filePath);
        const results = [];

        for (const url of urls) {
            const prompt = `Analyze the following URL for malicious content: ${url}`;
            const analysisResult = await generateResponse(prompt);

            const newAnalysis = new Analysis({ url, analysisResult, user: userId });
            await newAnalysis.save();

            results.push({ url, analysisResult });
        }

        res.status(201).json({ status: 'success', results });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error analyzing URL dataset' });
    }
};
const readUrlsFromFile = async (filePath) => {
    const fs = require('fs').promises;
    const data = await fs.readFile(filePath, 'utf8');
    return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
};

// Update URL analysis
const updateAnalysis = async (req, res) => {
    const { analysisId } = req.params;
    const { url } = req.body;

    try {
        const prompt = `Analyze the following URL for malicious content: ${url}`;
        const analysisResult = await generateResponse(prompt);

        const analysis = await Analysis.findById(analysisId);
        if (!analysis) {
            return res.status(404).json({ status: 'error', message: 'Analysis not found' });
        }

        analysis.url = url;
        analysis.analysisResult = analysisResult;
        await analysis.save();

        res.status(200).json({ status: 'success', message: 'Analysis updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error updating analysis' });
    }
};

// Delete URL analysis
const deleteAnalysis = async (req, res) => {
    const { analysisId } = req.params;

    try {
        const analysis = await Analysis.findById(analysisId);
        if (!analysis) {
            return res.status(404).json({ status: 'error', message: 'Analysis not found' });
        }

        await analysis.remove();
        res.status(200).json({ status: 'success', message: 'Analysis deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error deleting analysis' });
    }
};

module.exports = { analyzeUrl, analyzeUrlDataset, updateAnalysis, deleteAnalysis, upload };
