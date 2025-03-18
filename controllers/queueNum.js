const express = require("express");
const router = express.Router();

let queueCounter = 0;

// Reset queueCounter every day at 12am
function resetQueueCounterAtMidnight() {
	const now = new Date();
	const millisecondsUntilMidnight = new Date(now.setHours(24, 0, 0, 0)) - new Date();

	setTimeout(() => {
		queueCounter = 0; // Reset counter
		console.log("Queue counter has been reset to 0");
		resetQueueCounterAtMidnight(); // Re-run the reset at the next midnight
	}, millisecondsUntilMidnight);
}

// Call the reset function once when the server starts
resetQueueCounterAtMidnight();

// Generate queue number

const getQueueNum = (req, res) => {
	queueCounter++;
	const queueNum = queueCounter;
	res.json({ queueNum });
};


module.exports = { getQueueNum };

