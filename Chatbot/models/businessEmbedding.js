const mongoose = require('mongoose');

const BusinessEmbeddingSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    embeddingValue: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('BusinessEmbedding', BusinessEmbeddingSchema);
