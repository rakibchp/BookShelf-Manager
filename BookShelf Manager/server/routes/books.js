const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not retrieve books' });
  }
});

router.post('/', async (req, res) => {
  const { title, author, status } = req.body || {};
  if (typeof title !== 'string' || !title.trim() || typeof author !== 'string' || !author.trim()) {
    return res.status(400).json({ success: false, message: 'Title and author are required and cannot be empty' });
  }
  if (status !== undefined && !['read', 'unread'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Status must be "read" or "unread"' });
  }
  try {
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      ...(status !== undefined ? { status } : {}),
    });
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid book ID' });
  const { title, author, status } = req.body || {};
  const updates = {};
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) return res.status(400).json({ success: false, message: 'Title cannot be empty' });
    updates.title = title.trim();
  }
  if (author !== undefined) {
    if (typeof author !== 'string' || !author.trim()) return res.status(400).json({ success: false, message: 'Author cannot be empty' });
    updates.author = author.trim();
  }
  if (status !== undefined) {
    if (!['read', 'unread'].includes(status)) return res.status(400).json({ success: false, message: 'Status must be "read" or "unread"' });
    updates.status = status;
  }
  if (Object.keys(updates).length === 0) return res.status(400).json({ success: false, message: 'Provide title, author, or status to update' });
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid book ID' });
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book deleted successfully', data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not delete book' });
  }
});

module.exports = router;
