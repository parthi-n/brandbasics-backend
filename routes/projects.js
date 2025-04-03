const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const projectsCtrl = require("../controllers/projects");

router.post("/create", verifyToken, projectsCtrl.createProject);
router.post("/:userId", verifyToken, projectsCtrl.indexUserProjects);
router.get("/:projectId", verifyToken, projectsCtrl.retrieveProjectDetails);

module.exports = router;
