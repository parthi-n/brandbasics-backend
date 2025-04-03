const prisma = require("../modules/prisma.module");

// Index User Projects
const indexUserProjects = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.user.id,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const projects = await prisma.project.findMany({
			where: {
				projectOwnerId: req.params.userId,
			},
		});

		res.status(201).json(projects);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const retrieveProjectDetails = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.user.id,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const project = await prisma.project.findFirst({
			where: {
				id: req.params.projectId,
			},
		});

		if (!project) {
			return res.status(404).json({ error: "Project not found." });
		}

		res.status(200).json(project);
	} catch (error) {
		console.error("Error retrieving project:", error);
		res.status(500).json({ error: error.message });
	}
};

// Create Project
const createProject = async (req, res) => {
	try {
		// Check if email already exists
		const projectInDatabase = await prisma.project.findFirst({
			where: {
				projectName: req.body.projectName,
				projectOwnerId: req.user.id,
			},
		});

		if (projectInDatabase) {
			return res.status(409).json({ error: "Project name already taken." });
		}

		console.log(req.body);

		const project = await prisma.project.create({
			data: {
				projectName: req.body.projectName,
				projectOwnerId: req.user.id,
			},
		});

		const data = {
			message: "Project created successfully.",
			project: project,
		};

		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { indexUserProjects, retrieveProjectDetails, createProject };
