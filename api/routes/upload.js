const express = require('express');
const router = express.Router();

const {
    checkForHostExistence,
    checkProtocols,
    checkFtpCreds
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
 *                 example: www.ilikeemail.com
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
 *                 example: www.ilikeemail.com
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
 *               - hostName
 *               - userName
 *             properties:
 *               hostName:
 *                 type: string
 *                 example: localhost
 *               userName:
 *                 type: string
 *                 example: testuserftp
 *               userPassword:
 *                 type: string
 *                 example: testuserpw
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

module.exports = router;
