const { createQuickStrategy } = require("../services/quickStrategyGenerator");
const prisma = require("../modules/prisma.module");

const generateQuickStrategy = async (req, res) => {
	try {
		const aiStrategy = await createQuickStrategy(req.body);

		if (aiStrategy.success) {
			const aiStrategyInput = await prisma.quickStrategyInput.create({
				data: req.body,
			});

			const updatedOutputData = {
				...aiStrategy.strategy,
				userId: aiStrategyInput.userId,
				projectId: aiStrategyInput.projectId,
				quickStrategyInputId: aiStrategyInput.id,
			};
			const aiStrategyOutput = await prisma.quickStrategyOutput.create({
				data: updatedOutputData,
			});

			return res.status(200).json({ aiStrategyOutput });
		} else {
			res.status(500).json({ error: aiStrategy.error });
		}
	} catch (error) {
		console.error("Error:", error.message);
		res.status(500).json({ error: "Failed to generate brand strategy" });
	}
};

module.exports = { generateQuickStrategy };
