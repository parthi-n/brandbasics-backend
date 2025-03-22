const express = require("express");
const router = express.Router();
const openAiApiCtrl = require("../controllers/api-open-ai");


router.post("/generate-strategy", openAiApiCtrl.generateStrategy);

module.exports = router;
