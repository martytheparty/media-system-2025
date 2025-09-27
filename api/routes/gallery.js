const express = require('express');
const router = express.Router();

const {
    initialize,
    isInitialized,
    setTitle,
    getTitle,
    importMedia,
    getGalleryData
} = require('../controllers/galleryController');

/**
 * @swagger
 * /gallery/initialize:
 *   post:
 *     summary: Initialize gallery
 *     description: Accepts a name and returns `true` if it's a valid string.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Marty
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { name: string }"
 */


router.post('/initialize', initialize);

/**
 * @swagger
 * /gallery/setTitle:
 *   post:
 *     summary: set gallery title
 *     description: Accepts a name and returns `true` if it's a valid string.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Marty
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { name: string }"
 */


router.post('/setTitle', setTitle);

/**
 * @swagger
 * /gallery/isInitialized:
 *   get:
 *     summary: Get initialized stated
 *     responses:
 *       200:
 *         description: returns true if the gallery has been initialized and false otherwise
 */

// Route: GET /api/gallery/isInitialized
router.get('/isInitialized', isInitialized);

/**
 * @swagger
 * /gallery/getTitle:
 *   get:
 *     summary: Get title
 *     responses:
 *       200:
 *         description: returns title string if the gallery has been initialized and empty string otherwise
 */

// Route: GET /api/gallery/getTitle
router.get('/getTitle', getTitle);

/**
 * @swagger
 * /gallery/importMedia:
 *   get:
 *     summary: Import Media
 *     responses:
 *       200:
 *         description: returns true if the media files are found and moved.
 */

// Route: GET /api/gallery/importMedia
router.get('/importMedia', importMedia);

/**
 * @swagger
 * /gallery/data:
 *   get:
 *     summary: Gallery JSON
 *     responses:
 *       200:
 *         description: returns the current gallery JSON.
 */

// Route: GET /api/gallery/data
router.get('/data', getGalleryData);

module.exports = router;