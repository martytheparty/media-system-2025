// api/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const allowedExtensions = require('./mediaTypes.json'); // no change needed here

// Serve static files from the public folder
app.use(express.static(path.resolve(__dirname, '.')));

// Incoming directory
const INCOMING_DIR = path.resolve(__dirname, '../incoming');

// API endpoint
app.get('/api/files', (req, res) => {
  fs.readdir(INCOMING_DIR, (err, files) => {
    if (err) {
      console.error('Error reading incoming folder:', err);
      return res.status(500).json({ error: 'Unable to read incoming folder' });
    }

    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return allowedExtensions.includes(ext);
    });

    res.json({ files: mediaFiles });
  });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});