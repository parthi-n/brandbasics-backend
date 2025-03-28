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
const wtRouter = require("./routes/api-wt")
const openAiRouter = require("./routes/api-open-ai")

// Port
const port = process.env.PORT || 3000;


const corsOptions = {
	origin: "http://localhost:3000", // replace with your frontend URL
	credentials: true, // Allow cookies to be sent with the request
  };


// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/api-wt", wtRouter);
app.use("/api-openai", openAiRouter);


// Start the server and listen on port 3000
app.listen(port, () => {
	console.log("The express app is ready!");
});
