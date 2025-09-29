const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    addProject,
    getSingleProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');
const upload = require('../middlewares/upload');

router.get('/', getAllProjects).post('/', upload.single('image'), addProject).get('/:id', getSingleProject).put('/:id', upload.single('image'), updateProject).delete('/:id', deleteProject);

module.exports = router;