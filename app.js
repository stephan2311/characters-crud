// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const {isLoggedIn, isLoggedOut} = require("./middleware/route-guard");

const app = express();

//session config
require('./config/session.config')(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "characters-crud";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;


// expose session data for handlebars
app.use((req, res, next)=>{
    res.locals.session = req.session;
    next();
});


// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/characters", require("./routes/characters"));


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
