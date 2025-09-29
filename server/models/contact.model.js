const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        minlength: [10, "Message must be at least 10 characters"],
        maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
}, {
    timestamps: true,
    versionKey: false
});

const Contact = mongoose.model('Contact', contactSchema)


module.exports = Contact