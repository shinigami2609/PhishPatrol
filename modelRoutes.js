const express = require('express');
const { uploadModel, getModelDetails, upload } = require('../controllers/modelController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('modelFile'), uploadModel);
router.get('/:modelId', authMiddleware, getModelDetails);

module.exports = router;
