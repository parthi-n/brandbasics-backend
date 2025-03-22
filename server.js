// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

// Import routers
const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const wtRouter = require("./routes/api-wt")
const openAiRouter = require("./routes/api-open-ai")

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api-wt", wtRouter);
app.use("/api-openai", openAiRouter);


// Start the server and listen on port 3000
app.listen(3000, () => {
	console.log("The express app is ready!");
});
