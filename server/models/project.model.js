const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Project description is required"],
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Project image is required"]
    },
    link: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
            },
            message: props => `${props.value}is not a valid URL!`
        }
    },
    technologies: [{
        type: String,
        trim: true
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Project category is required"]
    },
    client: {
        name: {
            type: String,
            trim: true
        },
        industry: {
            type: String,
            trim: true
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    completionDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Completed", "In Progress", "Planned"],
        default: "Completed"
    }
}, {
    timestamps: true,
    versionKey: false
})

projectSchema.pre('save', function (next) {
    this.slug = slugify(this.title, {
        lower: true,
        strict: true
    });
    next();
});

const Project = mongoose.model('Project', projectSchema);

Project.syncIndexes().then(() => {
    console.log(`synced`);
});


module.exports = Project;