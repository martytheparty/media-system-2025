const express = require('express');
const router = express.Router();

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


router.post('/initialize', (req, res) => {
  const { name } = req.body;

  if (typeof name === 'string') {
    console.log(`Received name: ${name}`);
    res.json(true); // return true as JSON response
  } else {
    res.status(400).json({ error: 'Invalid request. Expected { name: string }' });
  }
});

module.exports = router;