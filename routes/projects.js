const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const projectsCtrl = require("../controllers/projects");

router.post("/create", projectsCtrl.create);
router.post("/:userId", projectsCtrl.IndexUserProjects);
router.post("/:userId/:projectId", projectsCtrl.ProjectDetails);

module.exports = router;
