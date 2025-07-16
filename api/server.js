// api/server.js
const express = require('express');
const path = require('path');
const setupSwagger = require('./swagger');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static(path.resolve(__dirname, '.')));

// Mount file routes
const fileRoutes = require('./routes/files');
app.use('/api', fileRoutes); // This prefixes all routes in files.js with /api

const galleryRoutes = require('./routes/gallery');
app.use('/api/gallery', galleryRoutes); // This prefixes all routes in gallery.js with /api


setupSwagger(app); // 👈 This adds /api-docs

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});