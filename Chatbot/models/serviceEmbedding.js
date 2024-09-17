const mongoose = require('mongoose');

const ServiceEmbeddingSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    embeddingValue: {
        type: [Number], // Assuming embeddings are arrays of numbers
        required: true
    }
});

module.exports = mongoose.model('ServiceEmbedding', ServiceEmbeddingSchema);
