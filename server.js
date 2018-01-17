var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Shortener = require("./app/models/shortener-model"),
    bodyParser = require('body-parser'),
    mongodb = require('./config/config.js');

mongoose.Promise = global.Promise;
mongoose.connect(mongodb.db_host, { useMongoClient: true });  // Connect to MongoDB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/shortener-routes');
routes(app);


app.listen(port);