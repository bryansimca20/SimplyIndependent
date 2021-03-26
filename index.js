const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path');

const app = express();


// Middleware declaration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


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