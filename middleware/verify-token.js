const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	try {
		const cookie = req.headers.cookie;

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

		// Verify the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach user info to the request object
		req.user = decoded;

		// Proceed to the next middleware
		next();
	} catch (err) {
		res.status(401).json({ err: "Invalid token." });
	}
}

module.exports = verifyToken;
