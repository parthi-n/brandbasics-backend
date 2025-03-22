const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const chat = async (req, res) => {
	const userInput = req.body;
	const prompt = "Why is the sky blue?";

	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "user", content: prompt }],
			max_tokens: 2048,
			temperature: 1,
			top_p: 1,
		});

		res.json({ output: completion.choices[0].message.content });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { chat };
