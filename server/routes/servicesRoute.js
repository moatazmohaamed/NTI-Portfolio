const express = require('express');
const {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} = require('../controllers/servicesController');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/', getAllServices);

router.get('/:id', getServiceById);

router.post('/', upload.single('icon'), createService);

router.put('/:id', upload.single('icon'), updateService);

router.delete('/:id', deleteService);

module.exports = router