const mongoose = require('mongoose');

const embeddingSchema = new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entityType' // This points to the model based on the 'entity' field
    },
    embeddingValue: {
      type: String, // Ensure you specify a type, assuming String for this example
      required: true,
    },
    entityType: {
      type: String,
      required: true,
      enum: ['Product', 'Service', 'Business'] // Restrict to these values as per your database
    }
});

module.exports = mongoose.model('Embedding', embeddingSchema);
