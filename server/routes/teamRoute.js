const express = require('express');
const router = express.Router();
const {
    getAllTeamMembers,
    getSingleTeamMember,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController.js');
const upload = require('../middlewares/upload.js');

router.get('/', getAllTeamMembers).get('/:id', getSingleTeamMember).post('/', upload.single('memberPhoto'), addTeamMember).put('/:id', upload.single('memberPhoto'), updateTeamMember).delete('/:id', deleteTeamMember);

module.exports = router;