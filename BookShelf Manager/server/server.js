require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);
app.get('/', (req, res) => res.json({ message: 'BookShelf Manager API is running' }));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ success: false, message: err.status === 400 ? 'Invalid JSON request body' : 'Internal Server Error' });
});

async function start() {
  if (!process.env.MONGO_URI) {
    console.error('Set the MONGO_URI environment variable before starting the server.');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`BookShelf API running on port ${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

start();
