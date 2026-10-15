const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Book title is required'], trim: true, maxlength: 160 },
  author: { type: String, required: [true, 'Author is required'], trim: true, maxlength: 120 },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false, toJSON: { virtuals: true } });

bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model('Book', bookSchema);
