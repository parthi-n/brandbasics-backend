const express = require("express");
const router = express.Router();
const openAiApiCtrl = require("../controllers/api-open-ai");

//router.post("/analyse", wtApiCtrl.analyse);
router.post("/chat", openAiApiCtrl.chat);

module.exports = router;
