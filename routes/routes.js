const express = require('express');
const router = express.Router();

/**
 * Routes
 */
const airTableRouter = require('./airtable');

/**
 * Map routes
 */
router.use('/airtable', airTableRouter);

module.exports = router;
