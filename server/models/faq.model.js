const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const FAQ = mongoose.model('FAQ', faqSchema);

FAQ.syncIndexes().then(() => {
  console.log('Indexes synchronized');
});

module.exports = FAQ;