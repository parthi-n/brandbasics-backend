const parseJson = (aiOutput) => {
	let parsedOutput;
	try {
		parsedOutput = JSON.parse(aiOutput);
		return {
			success: true,
			parsedOutput: parsedOutput,
		};
	} catch (error) {
		console.error("❌ JSON Parse Error:", error.message);
		return {
			success: false,
			rawOutput: aiOutput,
			error: "Failed to parse AI output. Check format.",
		};
	}
};

module.exports = parseJson;
