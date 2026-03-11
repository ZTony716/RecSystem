const recommendationService = require("../services/recommendationService");

const getRecommendations = async (req, res) => {

  const { userId } = req.params;

  try {

    const recommendations =
      await recommendationService.getRecommendations(userId);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });

  } catch (error) {

    console.error("Recommendation error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get recommendations"
    });
  }
};

module.exports = {
  getRecommendations
};