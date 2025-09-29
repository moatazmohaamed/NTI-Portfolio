const Project = require('../models/project.model');
const Category = require("../models/category.model.js")

const features = require('../utils/api.features.js');

const getAllProjects = async (req, res) => {
    try {
        const apiFeatures = new features(Project.find().populate('category').lean(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const [projects, projectCount] = await Promise.all([
            apiFeatures.query,
            Project.estimatedDocumentCount()
        ])

        res.status(200).json({
            results: projectCount,
            pagination: {
                page: +req.query.page || 1,
                limit: +req.query.limit || projectCount,
            },
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addProject = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const {
            technologies,
            client,
            category
        } = req.body;

        const categoryDoc = await Category.findOne({
            name: category
        });

        if (!categoryDoc) {
            return res.status(400).json({
                message: "Invalid category"
            });
        }

        const projectData = {
            ...req.body,
            technologies: JSON.parse(technologies || '[]'),
            client: client ? JSON.parse(client) : {},
            image,
            category: categoryDoc._id
        };

        const newProject = await Project.create(projectData);
        res.status(201).json({
            success: true,
            message: "Project added successfully",
            data: newProject
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getSingleProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            results: 1,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProject = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const {
            technologies,
            client,
            category,
            ...projectData
        } = req.body;

        if (technologies) projectData.technologies = JSON.parse(technologies);
        if (client) projectData.client = JSON.parse(client);

        if (category) {
            const categoryDoc = await Category.findOne({
                slug: category
            });
            if (!categoryDoc) {
                return res.status(400).json({
                    message: "Invalid category"
                });
            }
            projectData.category = categoryDoc._id;
        }


        if (image) projectData.image = image;
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, projectData, {
            new: true,
            runValidators: true
        });
        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: updatedProject
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.status(200).json({
            success: true,
            message: `Project with title: ${deletedProject.title} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getAllProjects,
    addProject,
    getSingleProject,
    updateProject,
    deleteProject
};