const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please add a title']
    },
    content: {
      type: String,
      required: [true, 'Please add content']
    },
    summary: {
      type: String // AI-generated summary (optional)
    },
    suggestions: {
      type: String // AI-generated suggestions (optional)
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
