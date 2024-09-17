// routes/index.js
const express = require("express");
const { handleMessage, clearHistory, imageSearch} = require("../controllers/chatController");

const router = express.Router();

router.post("/", handleMessage);
router.post("/imageSearch", imageSearch)
router.delete("/", clearHistory);

module.exports = router;