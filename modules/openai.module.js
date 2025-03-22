const { OpenAI } = require("openai");

let openaiClient = null;

const getOpenAIClient = () => {
	if (!openaiClient) {
    
		// Initialize OpenAI client only once
		openaiClient = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});
	}
	return openaiClient;
};

module.exports = getOpenAIClient;
