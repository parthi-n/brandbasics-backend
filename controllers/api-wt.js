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

module.exports = { analyse };
