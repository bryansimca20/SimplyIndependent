const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_API_KEY
});
var base = Airtable.base('appM8uA24bXuIX31A');

router.get('/', async(req, res, next) => {
   let results = [];

   base('Accounts').select({
      // Selecting the first 3 records in Full Caregiver Directory - contacts:
      view: "Full Caregiver Directory - contacts"
   }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(record => {
         let firstName = record.get("First Name");
         let lastName = record.get("Last Name");
         let certifications = record.get("Certifications");
         let YearsOfExperience = record.get("Experience (years)");

         let caregiver = {
            firstName,
            lastName,
            certifications,
            YearsOfExperience
         };
         
         results.push(caregiver);
      });

      res.status(200).send(results)
   }, function done(err) {
      if (err) { console.error(err); return; }
      res.status(500).send("Error fetching data, try again later.");

   });
})

module.exports = router;
