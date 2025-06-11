const express = require('express');
const router = express.Router();

const { getFiles, getMeta } = require('../controllers/filesController');

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Get all media files
 *     responses:
 *       200:
 *         description: List of media files
 */

router.get('/files', getFiles);

/**
 * @swagger
 * /files/meta:
 *   get:
 *     summary: Get media metadata
 *     responses:
 *       200:
 *         description: Media count and total size
 */

// Route: GET /api/files/meta
router.get('/files/meta', getMeta);

module.exports = router;
