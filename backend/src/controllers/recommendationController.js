const recommendationService = require("../services/recommendationService");

const getUserRecommendations = async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({
      success: false,
      message: "Invalid userId"
    });
  }

  try {
    const recommendations =
      await recommendationService.getUserRecommendations(Number(userId));

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error("User recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get user recommendations"
    });
  }
};

const getPopularRecommendations = async (req, res) => {
  try {
    const recommendations =
      await recommendationService.getPopularRecommendations();

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error("Popular recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get popular recommendations"
    });
  }
};

const getSimilarRecommendations = async (req, res) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    return res.status(400).json({
      success: false,
      message: "Invalid productId"
    });
  }

  try {
    const recommendations =
      await recommendationService.getSimilarRecommendations(Number(productId));

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error("Similar recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get similar recommendations"
    });
  }
};

const getAlsoViewedRecommendations = async (req, res) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    return res.status(400).json({
      success: false,
      message: "Invalid productId"
    });
  }

  try {
    const recommendations =
      await recommendationService.getAlsoViewedRecommendations(Number(productId));

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error("Also-viewed recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get also-viewed recommendations"
    });
  }
};

module.exports = {
  getUserRecommendations,
  getPopularRecommendations,
  getSimilarRecommendations,
  getAlsoViewedRecommendations
};
