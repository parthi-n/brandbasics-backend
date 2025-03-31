const prisma = require("../modules/prisma.module");

// Index User Projects
const IndexUserProjects = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.params.userId,
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

const ProjectDetails = async (req, res) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: req.params.userId,
			},
		});

		if (!user) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const project = await prisma.project.findUnique({
			where: {
				id: req.params.projectId,
			},
		});

		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Create Project
const create = async (req, res) => {
	try {
		// Check if email already exists
		const projectInDatabase = await prisma.project.findFirst({
			where: {
				projectName: req.body.projectName,
				projectOwnerId: req.body.projectOwnerId,
			},
		});

		if (projectInDatabase) {
			return res.status(409).json({ error: "Project name already taken." });
		}

		console.log(req.body);

		const project = await prisma.project.create({
			data: {
				projectName: req.body.projectName,
				projectOwnerId: req.body.projectOwnerId,
			},
		});

		const data = {
			message: "Project created successfully.",
			project: {
				projectName: project.projectName,
				projectOwnerId: project.projectOwnerId,
			},
		};

		res.status(201).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { IndexUserProjects, ProjectDetails,  create };
