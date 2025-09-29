const express = require('express');
const {
    getAllFAQs,
    createFAQ,
    deleteFAQ,
    updateFAQ,
    getFAQ
} = require('../controllers/faqController');

const router = express.Router();

router.get('/', getAllFAQs).get('/:id', getFAQ).post('/', createFAQ).put('/:id', updateFAQ).delete('/:id', deleteFAQ);


module.exports = router;