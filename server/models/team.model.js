const mongoose = require('mongoose');
const slugify = require('slugify');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Team member name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [100, "Name cannot exceed 100 characters"],
        unique: true,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        required: [true, "Team member role is required"],
        trim: true,
        maxlength: [100, "Role cannot exceed 100 characters"],
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    photo: {
        type: String,
        required: [true, "Team member photo is required"],
    },
    socialLinks: {
        linkedin: {
            type: String,
            trim: true,
        },
        github: {
            type: String,
            trim: true,
        },

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

teamMemberSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    });
    next();

})

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

(async () => {
    await TeamMember.syncIndexes()
})()

module.exports = TeamMember;