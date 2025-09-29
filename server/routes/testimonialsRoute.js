const express = require('express');
const {
    getTestimonials,
    createTestimonial,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialsController');
const router = express.Router();
const upload = require('../middlewares/upload')

router.get('/', getTestimonials).post('/', upload.single('photo'), createTestimonial).get('/:id', getSingleTestimonial).put('/:id', upload.single('photo'), updateTestimonial).delete('/:id', deleteTestimonial)


module.exports = router