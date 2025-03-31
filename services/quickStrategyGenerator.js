const { getBrandStrategy } = require("../services/openaiServices");
const parseJson = require("../utils/parseJson");
const { generateStrategyUserMessage } = require("../ai-prompts/openAiPrompts");

const createQuickStrategy = async (inputData) => {
	const { brandName, category, productValue, audienceInsights, desiredPersona, brandVision } = inputData;
	const userMessage = generateStrategyUserMessage(brandName, category, productValue, audienceInsights, desiredPersona, brandVision);

	try {
		const response = await getBrandStrategy(userMessage);

		// Extract the raw response content
		const aiOutput = response.choices[0].message.content;
		const parsedOutput = parseJson(aiOutput);

		if (parsedOutput.success) {
			// Successfully parsed the output
			return {
				success: true,
				strategy: parsedOutput.parsedOutput,
			};
		} else {
			// Return raw output if parsing fails
			return {
				success: false,
				//	output: parsedOutput.rawOutput,
				error: parsedOutput.error,
			};
		}
	} catch (error) {
		console.error("🚨 OpenAI Error:", error.message);
	}
};
module.exports = { createQuickStrategy };
