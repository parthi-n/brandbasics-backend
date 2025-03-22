const prisma = require("../modules/prisma.module");

const index = async (req, res) => {
	try {
		const users = await prisma.user.findMany();

		res.json(users);
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

const get = async (req, res) => {
	try {
		if (req.user.id !== req.params.userId) {
			return res.status(403).json({ err: "Unauthorized" });
		}

		const user = await prisma.user.findFirst({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			return res.status(404).json({ err: "User not found." });
		}

		res.json({ user });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};

module.exports = { index, get };
