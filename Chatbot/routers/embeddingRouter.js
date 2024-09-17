// routers/productRouter.js
const express = require('express');
const router = express.Router();
const { generalSearch } = require('../controllers/embeddingController');
const modifyTextWithOpenAI = require('../middleware/textModificationMiddleware');

router.get('/', modifyTextWithOpenAI, generalSearch);

module.exports = router;
