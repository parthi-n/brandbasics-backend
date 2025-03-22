const { assistant, nlu } = require("../services/watsonService");
require('dotenv').config();

const analyse = async (req, res) => {
	const { text } = req.body;
	try {
		const analysis = await nlu.analyze({
			text,
			features: {
				keywords: { limit: 5 },
				sentiment: {},
				categories: {},
			},
		});
		res.json(analysis.result);
	} catch (error) {
		console.error("NLU Error:", error);
		res.status(500).json({ error: "NLU analysis failed" });
	}
};

const chat = async (req, res) => {
	const { message } = req.body;
	console.log(process.env.WATSON_ASSISTANT_URL);
	try {
		const session = await assistant.createSession({
			assistantId: process.env.WATSON_ASSISTANT_ID,
		});

		const response = await assistant.message({
			assistantId: process.env.WATSON_ASSISTANT_ID,
			sessionId: session.result.session_id,
			input: {
				message_type: "text",
				text: message,
			},
		});

		res.json(response.result);
	} catch (error) {
		console.error("Assistant Error:", error);
		res.status(500).json({ error: "Watson Assistant failed" });
	}
};

module.exports = { analyse, chat };
