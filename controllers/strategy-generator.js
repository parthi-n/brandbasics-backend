const { generateQuickStrategy } = require("../services/quickStrategyGenerator");
const prisma = require("../modules/prisma.module");

const createQuickStrategy = async (req, res) => {
	try {
		const aiStrategy = await generateQuickStrategy(req.body);

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

const listQuickStrategies = async (req, res) => {
	try {
		const quickStrategies = await prisma.quickStrategyOutput.findMany({
			where: {
				userId: req.user.id,
				projectId: req.body.projectId,
			},
			include: {
				quickStrategyInput: true,
			},
		});

		if (quickStrategies.length === 0) {
			return res.status(404).json({ error: "No quick strategies found for this user." });
		}

		res.status(200).json(quickStrategies);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
	}
};

const retrieveQuickStrategy = async (req, res) => {
	try {
		const quickStrategy = await prisma.quickStrategyOutput.findMany({
			where: {
				userId: req.user.id,
				id: req.params.id,
				projectId: req.params.projectId,
			},
			include: {
				quickStrategyInput: true,
			},
		});

		if (quickStrategy.length === 0) {
			return res.status(404).json({ error: "No quick strategies found for this user." });
		}

		res.status(200).json(quickStrategy);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
	}
};

module.exports = { createQuickStrategy, listQuickStrategies, retrieveQuickStrategy };
