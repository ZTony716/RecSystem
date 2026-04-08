const express = require("express");
const { explainRecommendations } = require("../controllers/aiController");

const router = express.Router();

router.post("/explain-recommendations", explainRecommendations);

module.exports = router;