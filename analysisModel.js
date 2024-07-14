const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    analysisResult: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

analysisSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
    