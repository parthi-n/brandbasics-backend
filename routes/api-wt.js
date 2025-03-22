const express = require("express");
const router = express.Router();
const wtApiCtrl = require("../controllers/api-wt");

router.post("/analyse", wtApiCtrl.analyse);
router.post("/chat", wtApiCtrl.chat);

module.exports = router;
