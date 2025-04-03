const express = require("express");
const router = express.Router();
const strategyGenerator = require("../controllers/strategy-generator");
const verifyToken = require("../middleware/verify-token");

router.post("/create-quick-strategy", verifyToken, strategyGenerator.createQuickStrategy);
router.get("/list-quick-strategies/:projectId", verifyToken, strategyGenerator.listQuickStrategies);
router.get("/retrieve-quick-strategy/:projectId/:id", verifyToken, strategyGenerator.retrieveQuickStrategy);

module.exports = router;
