const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../modules/prisma.module");
const InputValidator = require("../utils/inputValidator");
const cookie = require("cookie");

const saltRounds = 12;

const signUp = async (req, res) => {
	try {
		const { username, email, password, userType } = req.body;

		// Check if email already exists
		const userInDatabase = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		// Validate username
		if (!username || !InputValidator.validateUsername(username)) {
			return res.status(400).json({ error: "Invalid username. It should be alphanumeric and between 3 to 20 characters." });
		}

		// Validate email
		if (!email || !InputValidator.validateEmail(email)) {
			return res.status(400).json({ error: "Invalid email format." });
		}

		// Validate password
		if (!password || !InputValidator.validatePassword(password)) {
			return res.status(400).json({ error: "Password must be at least 8 characters long, and include a number and a special character." });
		}

		if (userInDatabase) {
			return res.status(409).json({ error: "Username already taken." });
		}

		// Create the user
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				hashedPassword: bcrypt.hashSync(req.body.password, saltRounds),
				email: req.body.email,
				userType: req.body.userType || "user",
			},
		});

		// Create JWT token payload
		const payload = { username: user.username, id: user.id };

		// Sign the JWT token
		const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });

		z;

		res.status(201).json({ message: "User created successfully." });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signIn = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		// Check if the password exists and compare it
		if (!req.body.password || !user.hashedPassword) {
			return res.status(400).json({ error: "Missing password or hashed password." });
		}

		const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.hashedPassword);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const payload = { username: user.username, id: user.id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

		console.log(token);

		// Set the JWT token in an HTTP-only cookie
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", token, {
				httpOnly: true, // Ensure the cookie is not accessible via JavaScript
				secure: process.env.NODE_ENV === "production", // Only use Secure cookies in production
				maxAge: 60 * 60, // 1 hour expiration
				path: "/", // Available on all routes
			})
		);

		res.status(200).json({ message: "Login successful." });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const verifyToken = async (req, res) => {
	// Check if the Authorization header exists
	const authorizationHeader = req.headers.authorization;
	if (!authorizationHeader) {
		return res.status(400).json({ isValid: false, error: "Authorization header missing" });
	}

	const token = authorizationHeader.split(" ")[1];

	if (!token) {
		return res.status(400).json({ isValid: false, error: "Token missing from authorization header" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ isValid: true });
	} catch (err) {
		res.status(401).json({ isValid: false, error: "Invalid or expired token" });
	}
};

module.exports = { signUp, signIn, verifyToken };
