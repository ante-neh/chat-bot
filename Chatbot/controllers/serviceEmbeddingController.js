const { createServiceEmbedding, searchServiceEmbeddings } = require('../services/serviceEmbeddingService');

// Create an embedding for a service
const createService = async (req, res) => {
  try {
    const { text, objectId } = req.body;
    const embedding = await createServiceEmbedding(text, objectId);
    res.json(embedding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for related services
const searchServices = async (req, res) => {
  try {
    const { searchString } = req.body;
    const { page = 1, limit = 10 } = req.params;
    const results = await searchServiceEmbeddings(searchString, parseInt(page), parseInt(limit));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  searchServices
};
