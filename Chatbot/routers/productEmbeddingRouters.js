const express = require('express');
const router = express.Router();
const { createProduct, searchProducts, getProductDetails } = require('../controllers/productEmbeddingController');

router.post('/', createProduct);
// Adjust the route to pass parameters via URL path instead of query params
router.get('/search/:page/:limit', searchProducts);
router.get('/:id', getProductDetails);

module.exports = router;
