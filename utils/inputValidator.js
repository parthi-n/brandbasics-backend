class InputValidatorMethod {
	// Method to validate username
	static validateUsername(username) {
		const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric and underscores, 3-20 characters
		return usernameRegex.test(username);
	}

	// Method to validate email
	static validateEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	}

	// Method to validate password
	static validatePassword(password) {
		// At least 8 characters, including one number and one special character
		const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
		return passwordRegex.test(password);
	}
}

const InputValidator = (inputData, res) => {
	const { username, email, password } = inputData;
	
	// Validate username
	if (!username || !InputValidatorMethod.validateUsername(username)) {
		return res.status(400).json({ error: "Invalid username. It should be alphanumeric and between 3 to 20 characters." });
	}

	// Validate email
	if (!email || !InputValidatorMethod.validateEmail(email)) {
		return res.status(400).json({ error: "Invalid email format." });
	}

	// Validate password
	if (!password || !InputValidatorMethod.validatePassword(password)) {
		return res.status(400).json({ error: "Password must be at least 8 characters long, and include a number and a special character." });
	}

	// If validation passes, return true
	return true;
};

module.exports = InputValidator;
