const { createProductEmbedding, searchProductEmbeddings } = require('../services/productEmbeddingService');
const Product = require('../models/productModel');

// Create an embedding for a product
const createProduct = async (req, res) => {
  try {
    const { text, objectId, subCategory} = req.body;
    const embedding = await createProductEmbedding(text, objectId, subCategory);
    res.json(embedding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for related products
const searchProducts = async (req, res) => {
  try {
    const { searchString } = req.body;
    const { page = 1, limit = 10 } = req.params;
    const results = await searchProductEmbeddings(searchString, parseInt(page), parseInt(limit));
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(404).json({ message: 'No product found with the given ID' });
    }
    res.json(productDetails);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  searchProducts,
  getProductDetails
};
