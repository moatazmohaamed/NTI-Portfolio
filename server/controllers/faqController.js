const FAQ = require('../models/faq.model');

const createFAQ = async (req, res) => {
    try {
        const newFAQ = await FAQ.create(req.body);
        res.status(201).json({
            status: 'success',
            newFAQ
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json({
            status: 'success',
            results: await FAQ.countDocuments(),
            faqs
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

const getFAQ = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const faq = await FAQ.findOne({
            id
        });

        if (!faq) {
            return res.status(404).json({
                status: 'fail',
                message: 'No FAQ found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            faq
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

const updateFAQ = async (req, res) => {
    try {
        const id = req.params.id;
        const faq = await FAQ.findByIdAndUpdate(
            id,
            req.body, {
                new: true,
                runValidators: true
            }
        );

        if (!faq) {
            return res.status(404).json({
                status: 'fail',
                message: 'No FAQ found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            faq
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

const deleteFAQ = async (req, res) => {
    try {
        const id = req.params.id;
        const faq = await FAQ.findByIdAndDelete(id);

        if (!faq) {
            return res.status(404).json({
                status: 'fail',
                message: 'No FAQ found with that ID'
            });
        }

        res.status(204).json({
            status: 'success',
            message: `Questions: ${faq.question} deleted successfully`,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

module.exports = {
    createFAQ,
    getAllFAQs,
    getFAQ,
    updateFAQ,
    deleteFAQ
}