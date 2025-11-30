const express = require('express');
const router = express.Router();

const {
    getFiles,
    getMeta,
    checkTodaysDirectoryExistence,
    getDirectoryCount,
    getTodaysDirectory,
    createDirectory,
    createFtpTestFileController
} = require('../controllers/filesController');

/**
 * @swagger
 * /files:
 *   get:
 *     tags: [Files]
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
 *     tags: [Files]
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
 *     tags: [Files]
 *     summary: Determine if today's directory exists
 *     responses:
 *       200:
 *         description: Directory For Today Exists
 */

// Route: GET /api/files/todayExists
router.get('/files/todayExists', checkTodaysDirectoryExistence);

/**
 * @swagger
 * /files/directoryCount:
 *   post:
 *     tags: [Files]
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

/**
 * @swagger
 * /files/createDirectory:
 *   post:
 *     tags: [Files]
 *     summary: creates a new directory in the gallery folder
 *     description: Accepts a directory name and creates one if it does not already exist.
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
 *                 example: yyyy
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
 *                   example: "Invalid request. Expected { directoryName: string }"
 */


router.post('/files/createDirectory', createDirectory);

/**
 * @swagger
 * /files/getTodaysDirectory:
 *   get:
 *     tags: [Files]
 *     summary: Get Today's Directory ../gallery/2025/09/01/
 *     responses:
 *       200:
 *         description: returns the directory that would/should be created today
 */

// Route: GET /api/files/getTodaysDirectory
router.get('/files/getTodaysDirectory', getTodaysDirectory);

/**
 * @swagger
 * /files/generate-ftp-file:
 *   get:
 *     tags: [Files]
 *     summary: Generate a temporary file for FTP/SFTP testing
 *     description: Creates a uniquely named file locally that can be used to test FTP/SFTP upload functionality. The response includes the filename and local path.
 *     responses:
 *       200:
 *         description: Test file created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: FTP/SFTP test file created
 *                 filename:
 *                   type: string
 *                   example: ftp-test-1699999999999.txt
 *                 filePath:
 *                   type: string
 *                   example: ./ftp-test-files/ftp-test-1699999999999.txt
 *       500:
 *         description: Failed to create test file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to create FTP/SFTP test file
 *                 error:
 *                   type: string
 *                   example: "ENOENT: no such file or directory"
 */
router.get('/files/generate-ftp-file', createFtpTestFileController);

module.exports = router;
