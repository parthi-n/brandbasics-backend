const prisma = require("../modules/prisma.module");

const index = async (req, res) => {
	try {
		const users = await prisma.user.findMany();

		res.json(users);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const userInfo = async (req, res) => {
	console.log(req.user.id);
	const user = await prisma.user.findFirst({
		where: {
			id: req.user.id,
		},
	});
	try {
		const data = {
			message: "User data retrieved successfully.",
			user: {
				username: user.username,
				email: user.email,
				userType: user.userType,
				userId: user.id,
			},
		};
		res.json(data);
	} catch (err) {
		res.status(401).json({ isValid: false, error: "Invalid or expired token" });
	}
};

module.exports = { index, userInfo };
