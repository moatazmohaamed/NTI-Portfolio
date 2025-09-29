const mongoose = require("mongoose");
const {
    Schema
} = mongoose;

const StatisticSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
});

const CompanyValueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
});

const TechnologySchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

const StorySchema = new Schema({
    part1: {
        type: String,
        required: true
    },
    part2: {
        type: String,
        required: true
    },
    part3: {
        type: String,
        required: true
    },
});

const AboutSchema = new Schema({
    statistics: {
        type: [StatisticSchema],
        required: true
    },
    coreValues: {
        type: [CompanyValueSchema],
        required: true
    },
    technologies: {
        type: [TechnologySchema],
        required: true
    },
    companyInfo: {
        foundedYear: {
            type: String,
            required: true
        },
        mission: {
            type: String,
            required: true
        },
        vision: {
            type: String,
            required: true
        },
        story: {
            type: StorySchema,
            required: true
        },
    },
});

const About = mongoose.model("About", AboutSchema)

module.exports = About;