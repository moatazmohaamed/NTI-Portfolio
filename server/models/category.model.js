const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    minlength: [2, "Category name must be at least 2 characters"],
    maxlength: [50, "Category name cannot exceed 50 characters"],
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description cannot exceed 200 characters"],
  },
  order: {
    type: Number,
    default: 0,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

categorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = update.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    this.setUpdate(update);
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

Category.syncIndexes().then(() => {
  console.log(`synced`);
});

module.exports = Category;