const { getBrandStrategy } = require("../services/openaiServices");
const parseJson = require("../utils/parseJson");
const { generateStrategyUserMessage } = require("../ai-prompts/openAiPrompts");

const generateStrategy = async (req, res) => {
	const { brandName, category, productValue, customInsights, desiredPersona, brandVision } = req.body;

	const userMessage = generateStrategyUserMessage(brandName, category, productValue, customInsights, desiredPersona, brandVision);

	try {
		const response = await getBrandStrategy(userMessage);

		// Extract the raw response content
		const aiOutput = response.choices[0].message.content;
		const parsedOutput = parseJson(aiOutput);

		if (parsedOutput.success) {
			// Successfully parsed the output
			return res.status(200).json({
				//success: true,
				output: parsedOutput.parsedOutput,
			});
		} else {
			// Return raw output if parsing fails
			return res.status(200).json({
				//success: false,
				output: parsedOutput.rawOutput,
				error: parsedOutput.error,
			});
		}
	} catch (error) {
		console.error("🚨 OpenAI Error:", error.message);
		res.status(500).json({ error: "Failed to generate brand strategy" });
	}
};

module.exports = { generateStrategy };
