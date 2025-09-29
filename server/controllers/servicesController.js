const Services = require('../models/services.model');

const getAllServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json({
            status: 'success',
            results: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found with this ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const updateService = async (req, res) => {
    try {
        const {
            ...reqBody
        } = req.body
        
        // Create update object
        const updateData = { ...reqBody };
        
        // Only update icon if a new file is uploaded
        if (req.file) {
            updateData.iconImg = req.file.filename;
        }
        
        const service = await Services.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        await service.save();

        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found with this ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Services.findByIdAndDelete(req.params.id);

        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found with this ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const createService = async (req, res) => {
    try {
        const {
            ...reqBody
        } = req.body
        if (req.file) {
            reqBody.icon = req.file.filename;
        }
        const newService = await Services.create({
            ...reqBody,
            icon: req.file.filename
        });

        await newService.save();

        res.status(201).json({
            status: 'success',
            data: {
                service: newService
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    createService
}