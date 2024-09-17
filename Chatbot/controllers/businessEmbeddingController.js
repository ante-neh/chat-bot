const { createBusinessEmbedding, searchBusinessEmbeddings } = require('../services/businessEmbeddingService');

// Create an embedding for a business
const createBusiness = async (req, res) => {
  try {
    const { text, objectId } = req.body;
    const embedding = await createBusinessEmbedding(text, objectId);
    res.json(embedding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for related businesses
const searchBusinesses = async (req, res) => {
  try {
    const { searchString } = req.body;
    const { page = 1, limit = 10 } = req.params;
    const results = await searchBusinessEmbeddings(searchString, parseInt(page), parseInt(limit));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBusiness,
  searchBusinesses
};
