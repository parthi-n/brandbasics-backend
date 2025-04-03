const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const usersCtrl = require("../controllers/users");

router.get("/", verifyToken, usersCtrl.index);
router.post("/retrieve-user-data",verifyToken, usersCtrl.retrieveUserData);
//router.post("/:userId",verifyToken, usersCtrl.userInfo);


module.exports = router;
