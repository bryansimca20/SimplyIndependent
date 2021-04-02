const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');

require('dotenv').config();

const app = express();

const uri = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@simply-indepdent-cluste.tl7d3.mongodb.net/${process.env.DBCLUSTER}?retryWrites=true&w=majority`

/**
 * Setup Mongoose Connections
 */
 mongoose.connect(
  uri,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on("error", err => console.log(err))
db.once("open", () => {
  console.log("connection to Simply Independent database established")
})

// Middleware declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

// Setup routes to start with /api
const routes = require('./routes/routes');
app.use('/api', routes);


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//404 Handler
 app.use((req, res, next) => {
   next(createError(404));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);