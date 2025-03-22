const getOpenAIClient = require("../modules/openai.module");
const { systemMessage } = require("../ai-prompts/openAiPrompts");
const logTokenUsage = require("../utils/logTokenUsage");

const getBrandStrategy = async (userMessage) => {
	try {
		const openai = getOpenAIClient();
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [systemMessage, userMessage],
			max_tokens: 2048,
			temperature: 1,
			top_p: 1,
		});
		// Log token usage information
		logTokenUsage(response.usage);
		return response;
	} catch (error) {
		console.error("OpenAI API error:", error);
		throw error;
	}
};

module.exports = { getBrandStrategy };
