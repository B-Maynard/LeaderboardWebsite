const Game = require('../models/games.model');
var sanitize = require('mongo-sanitize');
const Auth = require('../utils/auth');


/*


--------------------------ENDPOINTS--------------------
    For all endpoints, we need to verify that the 
    user is calling with a valid API key. 
    Username/password authentication is done
    inside the auth method before the api is called.

    To call an endpoint inside Postman, you need to add an
    "Authorization" header, with a value of "Bearer [authToken]"
*/

/*    /test     */

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


/*    /create     */

// Create/update a game entry
exports.game_create = async function (req, res) {

    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    // Sanitize the inputs. This is just for our discord servers so it probably doesn't matter much, but do it anyway
    var name = sanitize(req.body.name);
    var maps = sanitize(req.body.maps);
    var modes = sanitize(req.body.modes);

    var foundDoc = await Game.findOne({"name": name})
                            .then(function (item) {
                                return item;
                    });
    

    // Check to see if the game already exists in the database. If it does, we'll just want to update any attributes instead of adding a new entry
    if (!foundDoc) {
        let game = new Game(
            {
                name: name,
                maps: maps,
                modes: modes
            }
        );
    
        game.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Game Created successfully.\n' + name + '\n' + maps + '\n' + modes);
        })
    }
    else {
        // We only want to update the items we're actually adding
        if (maps && modes) {
            await Game.updateOne({name: foundDoc.name}, {$addToSet: {'modes': modes, 'maps': maps}}, function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Game Updated successfully.\n' + name + '\n' + maps + '\n' + modes);
            });
        }
        else if (maps) {
            await Game.updateOne({name: foundDoc.name}, {$addToSet: {'maps': maps}}, function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Game Updated successfully.\n' + name + '\n' + maps);
            });
        }
        else if (modes) {
            await Game.updateOne({name: foundDoc.name}, {$addToSet: {'modes': modes}}, function (err) {
                if (err) {
                    return next(err);
                }
                res.send('Game Updated successfully.\n' + name + '\n' + modes);
            });
        }
    }
};

/*    /list     */

// List all the entries in the game collection
exports.game_getall = async function (req, res) {

    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    await Game.find()
    .then(function (docs) {
        res.send(docs);
    });

};