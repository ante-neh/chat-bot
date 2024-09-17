const mongoose = require('mongoose');

const ProductEmbeddingSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    embeddingValue: {
        type: [Number], // Assuming embeddings are arrays of numbers
        required: true
    },
    subCategory: {
        type: String,
        enum: ['Car', 'House'],
        required: true
    }
});

module.exports = mongoose.model('ProductEmbedding', ProductEmbeddingSchema);
