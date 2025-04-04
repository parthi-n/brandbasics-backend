const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../modules/prisma.module");
const InputValidator = require("../utils/inputValidator");
const cookie = require("cookie");

const saltRounds = 12;

const signUp = async (req, res) => {
	try {
		// Check if email already exists
		const userInDatabase = await prisma.user.findFirst({
			where: {
				email: req.body.email,
			},
		});

		if (userInDatabase) {
			return res.status(409).json({ error: "Username already taken." });
		}

		// Validate inputs
		const inputData = req.body;
		const validationResult = InputValidator(inputData, res);

		if (validationResult !== true) {
			return;
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

		// Create JWT token
		const payload = { username: user.username, id: user.id };
		const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });

		// Set the JWT token in an HTTP-only cookie
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", token, {
				httpOnly: true, // Ensure the cookie is not accessible via JavaScript
				secure: process.env.NODE_ENV === "production", // Only use Secure cookies in production
				maxAge: 60 * 60, // 1 hour expiration
				path: "/", // Available on all routes
				sameSite: "Strict",
			})
		);

		const data = {
			message: "User created successfully.",
			user: {
				username: user.username,
				email: user.email,
				userType: user.userType,
				userId: user.id,
			},
		};

		res.status(201).json(data);
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

		// Set the JWT token in an HTTP-only cookie
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", token, {
				httpOnly: true, // Ensure the cookie is not accessible via JavaScript
				secure: process.env.NODE_ENV === "production", // Only use Secure cookies in production
				maxAge: 60 * 60, // 1 hour expiration
				path: "/", // Available on all routes
				sameSite: "Strict",
			})
		);

		const data = {
			message: "User signed in successfully.",
			user: {
				username: user.username,
				email: user.email,
				userType: user.userType,
				userId: user.id,
			},
		};

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const signOut = async (req, res) => {
	// Clear the HTTP-only cookie
	res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

	// Respond with a message or success status
	res.json({ message: "Successfully signed out" });
};

const verifyToken = async (req, res) => {
	const cookie = req.headers.cookie;

	try {
		// Look for token in cookies
		if (!cookie) {
			return res.status(400).json({ isValid: false, error: "Cookie header missing" });
		}

		// Split cookies to find the token
		const tokenCookie = cookie.split(";").find((c) => c.trim().startsWith("token="));

		if (!tokenCookie) {
			return res.status(400).json({ isValid: false, error: "Token missing from cookies" });
		}

		// Extract the token value
		const token = tokenCookie.split("=")[1];

		if (!token) {
			return res.status(400).json({ isValid: false, error: "Token missing from cookies" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ isValid: true });
	} catch (err) {
		res.status(401).json({ isValid: false, error: "Invalid or expired token" });
	}
};

module.exports = { signUp, signIn, signOut, verifyToken };
