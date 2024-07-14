const Model = require('../models/modelModel');
const multer = require('multer');
const path = require('path');

const upload = multer({
    dest: 'uploads/models/'
});

// Upload new model
const uploadModel = async (req, res) => {
    const { file } = req;
    const { modelName, accuracy } = req.body;

    try {
        const newModel = new Model({
            modelName,
            modelFile: file.path,
            accuracy
        });

        await newModel.save();
        res.status(201).json({ status: 'success', modelId: newModel._id });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error uploading model' });
    }
};

// Get model details
const getModelDetails = async (req, res) => {
    const { modelId } = req.params;

    try {
        const model = await Model.findById(modelId);
        if (!model) {
            return res.status(404).json({ status: 'error', message: 'Model not found' });
        }

        res.status(200).json({
            status: 'success',
            modelDetails: {
                modelId: model._id,
                modelName: model.modelName,
                accuracy: model.accuracy,
                createdAt: model.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error getting model details' });
    }
};

module.exports = { uploadModel, getModelDetails, upload };
