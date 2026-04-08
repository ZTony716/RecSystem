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

const assistantChat = async (req, res) => {
  try {
    const {
      message,
      topCategories = [],
      recentEventTypes = [],
      recommendations = []
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "message is required"
      });
    }

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      return res.status(400).json({
        success: false,
        message: "recommendations array is required"
      });
    }

    const result = await aiService.generateAssistantReply({
      message,
      topCategories,
      recentEventTypes,
      recommendations
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("AI assistant error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate assistant response"
    });
  }
};

module.exports = {
  explainRecommendations,
  assistantChat
};