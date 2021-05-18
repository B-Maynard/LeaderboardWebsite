var credentials = require('./credentials.json');
const {MongoClient} = require('mongodb');
const Mongoose = require('mongoose');

const uri = "mongodb+srv://" + credentials.databaseUsername + ":" + credentials.databasePassword + "@cluster0.rjvk0.mongodb.net/data0?retryWrites=true&w=majority"

const client = new MongoClient(uri, {"useUnifiedTopology": true});

// The list of methods that can be used from this util file.
var methods = {

    /* Connects the client to the database */
    ConnectClient: async function() {
        // Connects the admin client to the database
        try {
            await client.connect();
            return client;
        } catch (e) {
            console.error(e);
        }
    },
    /* Disconnects the client from the database */
    DisconnectClient: async function() {
        // Disconnects the admin client from the database
        try {
            await client.close();
        } catch (e) {
            console.error(e);
        }
    },
    /* Setup the connection to the MongoDB using Mongoose (for CRUD opertations) */
    EstablishMongoose: async function() {
        // Set up mongoose connection
        try {
            await Mongoose.connect(uri, {"useNewUrlParser": true, "useUnifiedTopology": true});
            return Mongoose.connection;
        } catch (e) {
            console.error(e);
        }
    },
    /* Test function; List the databases available. */
    listDatabases: async function() {
        // Test function to make sure that the connection succeeded
        var databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }
};

// Exports the methods to be used outside this file.
module.exports = methods;