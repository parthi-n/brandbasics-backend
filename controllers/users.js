const prisma = require("../modules/prisma.module");

const index = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const retrieveUserData = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.user.id,
			},
			select: {
				id: true,
				username: true,
				email: true,
				userType: true,
				project: true,
				QuickStrategyOutput: {
					include: { quickStrategyInput: true },
				},
			},
		});

		const data = {
			message: "User data retrieved successfully.",
			user,
		};

		//console.log("retrieveUserData", data.user.project);
		res.json(data);
	} catch (err) {
		res.status(401).json({ isValid: false, error: "Invalid or expired token" });
	}
};

module.exports = { index, retrieveUserData };
