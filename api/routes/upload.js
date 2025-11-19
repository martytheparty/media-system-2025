const express = require('express');
const router = express.Router();

const {
    checkForHostExistence,
    checkProtocols,
    checkFtpCreds,
    checkSftpCreds
} = require('../controllers/uploadController');

/**
 * @swagger
 * /upload/checkHost:
 *   post:
 *     summary: Checks to see if the provided host exists
 *     description: Accepts a host name and checks to see if the DNS exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hostName
 *             properties:
 *               hostName:
 *                 type: string
 *                 example: 127.0.0.1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { success: true, message: address }
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { hostName: string }"
 */


router.post('/checkHost', checkForHostExistence);

/**
 * @swagger
 * /upload/checkProtocols:
 *   post:
 *     summary: Checks to see if the provided host supports ftp and/or sftp
 *     description: Accepts a host name and checks to see if the FTP/SFTP.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hostName
 *             properties:
 *               hostName:
 *                 type: string
 *                 example: 127.0.0.1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { ftp: true, stfp: true }
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { hostName: string }"
 */


router.post('/checkProtocols', checkProtocols);

router.post('/checkHost', checkForHostExistence);

/**
 * @swagger
 * /upload/checkFtpCredentials:
 *   post:
 *     summary: Checks to see if the provided host and credentials work.
 *     description: Accepts a host name and credentials and checks to see a successful connection can be made.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *             properties:
 *               key:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { ftp: true }
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { hostName: string }"
 */

router.post('/checkFtpCredentials', checkFtpCreds);

/**
 * @swagger
 * /upload/checkSftpCredentials:
 *   post:
 *     summary: Checks to see if the provided host and credentials work.
 *     description: Accepts a host name and credentials and checks to see a successful connection can be made.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *             properties:
 *               key:
 *                 type: string
 *                 example: 123
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { sftp: true }
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request. Expected { hostName: string }"
 */

router.post('/checkSftpCredentials', checkSftpCreds);

module.exports = router;
