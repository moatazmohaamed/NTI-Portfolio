const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;