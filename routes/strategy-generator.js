const express = require("express");
const router = express.Router();
const strategyGenerator = require("../controllers/strategy-generator");


router.post("/quick-strategy", strategyGenerator.generateQuickStrategy);

module.exports = router;
