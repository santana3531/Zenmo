// Dependencies
// =============================================================

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

// Requiring our models for syncing
var db = require("./models");

//Sets PORT variable
const PORT = process.env.PORT || 3000;

const app = express();

//Serves static content for the app from the 'public' directory
app.use(express.static(__dirname + '/public'));

//Serves static content for the app from the 'logic' directory
app.use(express.static(__dirname + '/logic'));

app.use(bodyParser.urlencoded({ extended: false }));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//Sets handlebars as the view engine
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Imports routes controllers
require('./controllers/transaction-routes.js')(app);
require('./controllers/user-routes.js')(app);
require('./controllers/routes.js')(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});