const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
	orders: {
		type: Array,
		required: true,
	},
	totalPrice: {
		type: Number,
	},
	queueNumber: {
		type: Number,
	},
	status: {
		type: String,
		enum: ['Completed', 'Ready for Collection', 'Preparing'],
	}
});

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	ordersList: [ordersSchema],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

module.exports = mongoose.model('User', userSchema);
