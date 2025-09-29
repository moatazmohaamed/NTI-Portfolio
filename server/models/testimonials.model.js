const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    },
    role: {
        type: String,
        trim: true,
        maxlength: [100, "Role cannot exceed 100 characters"],
    },
    company: {
        type: String,
        trim: true,
        maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    message: {
        type: String,
        required: [true, "Testimonial message is required"],
        trim: true,
    },
    photo: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
        default: 5,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema)


module.exports = Testimonial;