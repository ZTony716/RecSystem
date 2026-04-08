const express = require("express");
const {
  explainRecommendations,
  assistantChat
} = require("../controllers/aiController");

const router = express.Router();

router.post("/explain-recommendations", explainRecommendations);
router.post("/assistant", assistantChat);

module.exports = router;