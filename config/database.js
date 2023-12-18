const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// MongoDB connection URL
const dbURL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Set up MongoDB connection
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log(`Connected to MongoDB at ${dbURL}`);
});

// Export the mongoose connection
module.exports = db;
