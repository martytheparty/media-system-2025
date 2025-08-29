const express = require('express');
const router = express.Router();

const { getFiles, getMeta, checkTodaysDirectoryExistence, getDirectoryCount } = require('../controllers/filesController');

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

/**
 * @swagger
 * /files/todayExists:
 *   get:
 *     summary: Determine if today's directory exists
 *     responses:
 *       200:
 *         description: Directory For Today Exists
 */

// Route: GET /api/files/todayExists
router.get('/files/todayExists', checkTodaysDirectoryExistence);

// /**
//  * @swagger
//  * /files/directoryCount:
//  *   get:
//  *     summary: Returns the number of directories within a directory
//  *     responses:
//  *       200:
//  *         description: Directory Count so the next directory to be created can be determined
//  */

// // Route: GET /api/files/directoryCount
// router.get('/files/directoryCount', checkTodaysDirectoryExistence);

/**
 * @swagger
 * /files/directoryCount:
 *   post:
 *     summary: get directory count
 *     description: Accepts a directory name and returns the number of directories inside of it or 0 if the directory does not exist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - directoryName
 *             properties:
 *               directoryName:
 *                 type: string
 *                 example: gallery/yyyy/mm/dd
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *               example: 1
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { directoryName: string }"
 */


router.post('/files/directoryCount', getDirectoryCount);

module.exports = router;
