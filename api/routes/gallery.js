const express = require('express');
const router = express.Router();

const { initialize } = require('../controllers/galleryController');

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

module.exports = router;