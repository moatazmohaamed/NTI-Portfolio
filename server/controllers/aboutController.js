const About = require("../models/about.model");

const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();
        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About information not found"
            });
        }
        res.status(200).json({
            success: true,
            about
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createAbout = async (req, res) => {
    try {
        const existingAbout = await About.findOne();
        if (existingAbout) {
            return res.status(400).json({
                success: false,
                message: "About information already exists. Use update instead."
            });
        }
        
        const about = await About.create(req.body);
        res.status(201).json({
            success: true,
            message: "About information created successfully",
            about
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateAbout = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            ...newData
        } = req.body;
        const about = await About.findByIdAndUpdate(id, newData, {
            new: true,
            runValidators: true,
        });
        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About information not found"
            });
        }
        res.json({
            success: true,
            message: 'About is edited successfully',
            about
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteAbout = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const about = await About.findByIdAndDelete(id);
        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About information not found"
            });
        }
        res.json({
            success: true,
            message: "About information deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout,
};