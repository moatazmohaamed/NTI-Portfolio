const express = require('express');
const {
    submitForm,
    getAllSubmissions,
    deleteSubmission
} = require('../controllers/contactFromController');
const router = express.Router();

router.post('/', submitForm).get('/submissions', getAllSubmissions).delete('/submissions/:id', deleteSubmission)

module.exports = router