// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

// Import routers
const verifyJwt = require("./controllers/verify-jwt");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const wtRouter = require("./routes/api-wt");
const openAiRouter = require("./routes/api-open-ai");
const projectsRouter = require("./routes/projects");
const strategyGeneratorRouter = require("./routes/strategy-generator");

// Port
const port = process.env.PORT || 3500;

const corsOptions = {
	origin: process.env.FRONTEND_URL, // replace with your frontend URL
	credentials: true, // Allow cookies to be sent with the request
};

console.log(corsOptions.origin);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api-wt", wtRouter);
app.use("/api-openai", openAiRouter);
app.use("/projects", projectsRouter);
app.use("/strategy", strategyGeneratorRouter);

// Start the server and listen on port 3000
app.listen(port, () => {
	console.log("The express app is ready!");
});
