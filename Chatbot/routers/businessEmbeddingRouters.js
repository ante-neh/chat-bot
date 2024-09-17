const express = require('express');
const router = express.Router();
const { createBusiness, searchBusinesses } = require('../controllers/businessEmbeddingController');

router.post('/', createBusiness);
// Adjust the route to pass parameters via URL path instead of query params
router.get('/search/:page/:limit', searchBusinesses);

module.exports = router;
