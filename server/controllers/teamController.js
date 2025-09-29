const TeamMember = require('../models/team.model')
const features = require('../utils/api.features.js');

const getAllTeamMembers = async (req, res) => {
    try {
        const apiFeatures = new features(TeamMember.find(), req.query)
        const teamMembers = await apiFeatures.query;
        const teamMemberCount = await TeamMember.countDocuments();
        res.status(200).json({
            results: teamMemberCount,
            data: teamMembers
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const addTeamMember = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const socialLinks = req.body.socialLinks ? JSON.parse(req.body.socialLinks) : {};
        req.body.socialLinks = socialLinks;
        req.body.photo = image;
        const existingMember = await TeamMember.findOne({
            name: req.body.name
        });
        if (existingMember) {
            return res.status(409).json({
                success: false,
                message: "Team member with this name already exists"
            });
        }
        const newMember = await TeamMember.create(req.body);
        res.status(201).json({
            results: 1,
            message: "Team member added successfully",
            data: newMember
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getSingleTeamMember = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await TeamMember.findById(id);
        if (!member) {
            return res.status(404).json({
                message: "Team member not found"
            });
        }
        res.status(200).json({
            results: 1,
            data: member
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateTeamMember = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        const id = req.params.id
        if (image) {
            req.body.photo = image;
        };
        const updatedMember = await TeamMember.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedMember) {
            return res.status(404).json({
                message: "Team member not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            data: updatedMember
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({
                message: "Team member not found"
            });
        }
        res.status(200).json({
            success: true,
            message: `Team member with name: ${deletedMember.name} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllTeamMembers,
    addTeamMember,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember
};