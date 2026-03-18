const express = require("express");
const {
  getUserRecommendations,
  getPopularRecommendations,
  getSimilarRecommendations,
  getAlsoViewedRecommendations
} = require("../controllers/recommendationController");

const router = express.Router();

router.get("/user/:userId", getUserRecommendations);
router.get("/popular", getPopularRecommendations);
router.get("/similar/:productId", getSimilarRecommendations);
router.get("/also-viewed/:productId", getAlsoViewedRecommendations);

module.exports = router;
