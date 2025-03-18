const express = require("express");
const router = express.Router();
const queueNum = require("../controllers/queueNum");


router.get("/", queueNum.getQueueNum)


module.exports = router;
