const Express = require('express');
const BodyParser = require('body-parser')
const Database = require('../utils/database.js');

const Game = require('../routes/games.route'); // Imports routes for the games
const User = require('../routes/users.route'); // Routes for users
const Auth = require('../routes/auth.route'); // Routes for auth

const App = Express();

// Set up the database connection through mongoose
var db = Database.EstablishMongoose();

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({extended: false}));

// Establish the different routes for the different table objects
App.use('/game', Game);
App.use('/user', User)
App.use('/auth', Auth)

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});