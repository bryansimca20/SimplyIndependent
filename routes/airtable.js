const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async(req, res, next) => {
   res.status(200).send("this is the airtable api route")
})

module.exports = router;