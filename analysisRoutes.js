const express = require('express');
const { analyzeUrl, analyzeUrlDataset, updateAnalysis, deleteAnalysis, upload } = require('../controllers/analysisController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/analyze', authMiddleware, analyzeUrl);
router.post('/analyze-dataset', authMiddleware, upload.single('dataset'), analyzeUrlDataset);
router.put('/:analysisId', authMiddleware, updateAnalysis);
router.delete('/:analysisId', authMiddleware, deleteAnalysis);

module.exports = router;
