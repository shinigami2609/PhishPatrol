const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    modelName: {
        type: String,
        required: true,
        trim: true
    },
    modelFile: {
        type: String,
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
