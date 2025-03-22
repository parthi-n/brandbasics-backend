const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../modules/prisma.module");

const saltRounds = 12;

const signUp = async (req, res) => {
	try {
		// Check if username already exists
		const userInDatabase = await prisma.user.findFirst({
			where: {
				username: req.body.username,
			},
		});

		if (userInDatabase) {
			return res.status(409).json({ error: "Username already taken." });
		}

		// Create the user
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
				userType: req.body.userType || "user",
			},
		});

		// Create JWT token payload
		const payload = { username: user.username, id: user.id };

		// Sign the JWT token
		const token = jwt.sign({ payload }, process.env.JWT_SECRET);

		// Send response with token
		res.status(201).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signIn = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}
		console.log(req.body.password);
		console.log(user.hashedPassword);

		// Check if the password exists and compare it
		if (!req.body.password || !user.hashedPassword) {
			return res.status(400).json({ error: "Missing password or hashed password." });
		}

		const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.hashedPassword);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const payload = { username: user.username, id: user.id };
		const token = jwt.sign({ payload }, process.env.JWT_SECRET);

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { signUp, signIn };
