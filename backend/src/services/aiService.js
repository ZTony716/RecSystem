const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

async function generateRecommendationExplanation(payload) {
  const {
    topCategories = [],
    recentEventTypes = [],
    recommendations = [],
  } = payload;

  const prompt = `
You are an AI assistant for an e-commerce recommendation system.

Given:
- User top categories: ${topCategories.join(", ") || "None"}
- Recent user event types: ${recentEventTypes.join(", ") || "None"}
- Recommended products:
${recommendations
  .map((item, index) => `${index + 1}. ${item.name} (${item.category})`)
  .join("\n")}

Please return:
1. one short overall explanation of why these products are recommended
2. one short reason for each recommended product

Requirements:
- Keep the response concise and user-friendly
- Do not invent behaviors not provided
- Focus on recommendation logic, user interest, and relevance
- Return valid JSON only
- Use this format exactly:
{
  "summary": "...",
  "reasons": [
    { "productName": "...", "reason": "..." }
  ]
}
`;

  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content:
          "You are a helpful recommendation explanation assistant. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(response.output_text);
}

async function generateAssistantReply(payload) {
  const {
    message = "",
    topCategories = [],
    recentEventTypes = [],
    recommendations = [],
  } = payload;

  const prompt = `
You are an AI shopping assistant for an e-commerce recommendation system.

User request:
"${message}"

User context:
- Top categories: ${topCategories.join(", ") || "None"}
- Recent event types: ${recentEventTypes.join(", ") || "None"}

Available recommended products:
${recommendations
  .map(
    (item, index) =>
      `${index + 1}. ${item.name} | Category: ${item.category} | Price: ${item.price ?? "N/A"} | Description: ${item.description ?? "N/A"}`
  )
  .join("\n")}

Your job:
- Help the user narrow down the best options from the provided products
- Do not invent products that are not in the list
- Prefer products that match the user's request and user context
- Keep the response short, clear, and helpful

Return valid JSON only using this exact format:
{
  "reply": "...",
  "picks": [
    {
      "productName": "...",
      "reason": "..."
    }
  ],
  "followUp": "..."
}
`;

  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content:
          "You are a helpful AI product assistant. Return only valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(response.output_text);
}

module.exports = {
  generateRecommendationExplanation,
  generateAssistantReply,
};