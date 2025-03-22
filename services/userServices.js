const prisma = require("../modules/prisma.module");
const bcrypt = require("bcrypt");

const createUser = async (userDetails) => {
	const { username, password, email, firstName, lastName } = userDetails;
	const hashedPassword = bcrypt.hashSync(password, 10);
	//const createObj = { username, password: hashedPassword, email, firstName, lastName };
	const createObj = { username, password: hashedPassword };
	console.log(username)
	console.log(`createObj: ${createObj}`);
	await User.create(createObj);
	return createObj
};

module.exports = { createUser };