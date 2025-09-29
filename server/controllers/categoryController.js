const Category = require('../models/category.model');

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const getSingleCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            slug: req.params.slug
        });

        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'Category not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const updated = req.body;
        const category = await Category.findOneAndUpdate({
                slug: req.params.slug
            },
            updated, {
                new: true,
                runValidators: true
            }
        );
        if (!category) {
            return res.status(404).json({
                status: 'fail',
                message: 'Category not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: category
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            slug: req.params.slug
        });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: `${category.name} is deleted successfully!`
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
};