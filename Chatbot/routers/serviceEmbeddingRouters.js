const express = require('express');
const router = express.Router();
const { createService, searchServices } = require('../controllers/serviceEmbeddingController');

router.post('/', createService);
// Adjust the route to pass parameters via URL path instead of query params
router.get('/search/:page/:limit', searchServices);

module.exports = router;
