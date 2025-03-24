class InputValidator {
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

module.exports = InputValidator;
