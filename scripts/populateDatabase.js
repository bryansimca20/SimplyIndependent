const Airtable = require('airtable');
var mongoose = require('mongoose');
const Caregiver = require('../models/Caregiver');

require('dotenv').config();

/**
 * Create mongoDB connection
 */
const uri = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@main-cluster.tl7d3.mongodb.net/${process.env.DBCLUSTER}?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
   console.log("Connection to Simply Independent's MongoDB Database established")

   /**
    * Retrieve Data from airtable and send it to mongoDB
    */
   const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

   Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: AIRTABLE_API_KEY
   });
   var base = Airtable.base('appM8uA24bXuIX31A');

   base('Accounts').select({
      maxRecords : 10,
      view: "Full Caregiver Directory - contacts"
   }).eachPage(function page(records) {

      // get all the data from airtable
      records.forEach(record => {
         let firstName = record.get("First Name");
         if (firstName === undefined) return;
         let airtableID = record.id;
         let lastName = record.get("Last Name");
         let certifications = record.get("Certifications");
         let experience = record.get("Experience (years)");
         let availability = record.get("Shift availability");
         let phone = record.get("Phone");

         let caregiver = {
            airtableID,
            firstName,
            lastName,
            certifications,
            experience,
            availability,
            phone,
            location: "San Diego, CA",
         };
         
         //MongoDB data input processing:
         Caregiver.find({airtableID : caregiver.airtableID}, (err, items) => {
            if (err) {
               console.log("Problem accessing upcoming event in Database, try again later") 
               return;
            }

            // 1. Find if the data is already yet in the mongo database, if not then create a new record
            // 2. If data exists, update
            const caregiverData = new Caregiver(caregiver);
            if (items.length === 0) {
               caregiverData.save(err => {
                  if (err) throw new Error(err)
                  console.log(`Successfully saved ${caregiver.firstName} ${caregiver.lastName} into database`)
               })
            } else if (items.length !== 0) {
               Caregiver.findOneAndUpdate({airtableID : caregiver.airtableID}, caregiver, null, (err, doc) => {
                  if (err) console.log(`Error updating ${caregiver.firstName} ${caregiver.lastName} into database`, err)
                  console.log(`Successfully updated ${caregiver.firstName} ${caregiver.lastName} into database`)
               })
            }
         })
      });

      }, function done(err) {
         if (err) { console.error(err); return; }
      }
   );
})


