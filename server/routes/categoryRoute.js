const express = require('express');
const router = express.Router();
const {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

router.get('/', getAllCategories)
    .post('/', createCategory)
    .get('/:slug', getSingleCategory)
    .put('/:slug', updateCategory)
    .delete('/:slug', deleteCategory);

module.exports = router;