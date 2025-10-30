const express = require('express');
const router = express.Router();

const {
    checkForHostExistence
} = require('../controllers/uploadController');

/**
 * @swagger
 * /upload/checkHost:
 *   post:
 *     summary: Checks to see if the provided host exists
 *     description: Accepts a host name and checks to see of the DNS exists.
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

module.exports = router;
