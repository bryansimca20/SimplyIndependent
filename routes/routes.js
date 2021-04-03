const express = require('express');
const router = express.Router();

/**
 * Routes
 */
const getFieldsRouter = require('./getfields');

/**
 * Map routes
 */
router.use('/getfields', getFieldsRouter);

module.exports = router;
