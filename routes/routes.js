const express = require('express');
const router = express.Router();

/**
 * Routes
 */
const airTableRouter = require('./airtable');
const getFieldsRouter = require('./getfields');

/**
 * Map routes
 */
router.use('/airtable', airTableRouter);
router.use('/getfields', getFieldsRouter);

module.exports = router;
