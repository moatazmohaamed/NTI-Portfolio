const testimonialSchema = require('../models/testimonials.model')
const apiFeatures = require('../utils/api.features')

const getTestimonials = async (req, res) => {
    try {
        const features = new apiFeatures(testimonialSchema.find().lean(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const [testimonials, testimonialCount] = await Promise.all([
            features.query,
            testimonialSchema.estimatedDocumentCount()
        ]);

        res.status(200).json({
            success: true,
            results: testimonialCount,
            data: {
                pagination: {
                    currentPage: +req.query.page || 1,
                    limit: +req.query.limit || testimonialCount,
                },
                testimonials,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleTestimonial = async (req, res) => {
    try {
        const id = req.params.id
        const oneTestimonial = await testimonialSchema.findById(id);
        !oneTestimonial ? res.status(404).json({
            message: "Testimonial is not found"
        }) : oneTestimonial
        res.status(200).json({
            success: true,
            results: 1,
            data: oneTestimonial
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// will be reviewed by the admin to accept

const createTestimonial = async (req, res) => {
    try {
        const {
            ...reqBody
        } = req.body
        const image = req.file ? req.file.filename : '';
        reqBody.photo = image
        const testimonial = await testimonialSchema.create(reqBody)
        res.status(201).json({
            success: true,
            message: "Testimonail has been created successfully!",
            data: testimonial
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateTestimonial = async (req, res) => {
    try {
        const id = req.params.id
        const {
            ...reqBody
        } = req.body
        if (req.file) {
            reqBody.photo = req.file.filename;
        }
        const testimonial = await testimonialSchema.findByIdAndUpdate(id, reqBody, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            success: true,
            message: `Testimonial of ${testimonial.company || testimonial.name} is updated successfully!`,
            data: testimonial
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error: " + error.message
        });
    }
}

// Admin only
const deleteTestimonial = async (req, res) => {
    try {
        const id = req.params.id
        const testimonial = await testimonialSchema.findByIdAndDelete(id);
        !testimonial ? res.status(404).json({
            success: false,
            message: "Testimonial is not found"
        }) : testimonial
        res.status(200).json({
            success: true,
            message: `Testimoanil of company: ${testimonial.company} is deleted successfully!`
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getTestimonials,
    createTestimonial,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial
}