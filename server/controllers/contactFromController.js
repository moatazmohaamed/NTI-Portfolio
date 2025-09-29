const Contact = require('../models/contact.model')
const features = require('../utils/api.features')

const submitForm = async (req, res) => {
    try {
        const {
            ...formData
        } = req.body
        const contact = await Contact.create(formData)
        res.status(201).json({
            success: true,
            message: "Contact form submitted successfully",
            data: contact.toObject()
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const getAllSubmissions = async (req, res) => {
    try {
        const apiFeatures = new features(Contact.find().lean(), req.query)
            .sort()
            .limitFields()
            .paginate();

        const [submissions, submissionsCount] = await Promise.all([
            apiFeatures.query,
            Contact.estimatedDocumentCount()
        ])

        res.status(200).json({
            success: true,
            results: submissionsCount,
            pagination: {
                page: +req.query.page || 1,
                limit: +req.query.limit || submissionsCount,
            },
            data: submissions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// admin 
const deleteSubmission = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const submission = await Contact.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `${submission.name} submission is deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


module.exports = {
    submitForm,
    getAllSubmissions,
    deleteSubmission
}