const aiService = require("../services/aiService");

const explainRecommendations = async (req, res) => {
  try {
    const { topCategories, recentEventTypes, recommendations } = req.body;

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "recommendations array is required"
      });
    }

    const result = await aiService.generateRecommendationExplanation({
      topCategories,
      recentEventTypes,
      recommendations
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("AI explanation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate recommendation explanation"
    });
  }
};

module.exports = {
  explainRecommendations
};