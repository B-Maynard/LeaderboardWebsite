const User = require('../models/users.model');
var sanitize = require('mongo-sanitize');
const crypto = require('crypto');
const Auth = require('../utils/auth');


/*


--------------------------ENDPOINTS--------------------
    For all endpoints, we need to verify that the 
    user is calling with a valid API key. 
    Username/password authentication is done
    inside the auth method before the api is called.

*/

/*    /test     */

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


/*    /create     */
exports.user_create = async function (req, res) {

    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    var username = sanitize(req.body.username);
    var password = sanitize(req.body.password);

    var foundUser = await User.findOne({"username": username})
    .then(function (item) {
        return item;
    });


    if (foundUser) {
        res.send("Username already exists.");
        return;
    }


    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(password)
        .digest("base64");

    password = salt + "$" + hash;

    // Always create a new user at permission level normal. The only user that should have an admin permission type is
    // the single admin user.
    let user = new User(
        {
            username: username,
            password: password,
            permissionLevel: 1
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User created. ID: ' + user._id);
    })
};

/*    /findbyid    */
exports.user_findbyid = async function (req, res) {
    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    var id = sanitize(req.body.id);

    await User.findOne({_id: id})
    .then(function (user) {
        user = user.toJSON();
        delete user.__v;
        delete user.password;
        res.send(user);
    });

};

/*    /updatepasswordbyid    */
exports.user_updatePasswordById = async function (req, res) {
    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    var id = sanitize(req.body.id);
    var password = sanitize(req.body.password);

    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt)
            .update(password)
            .digest("base64");
    
        password = salt + "$" + hash;
        await User.findOneAndUpdate({_id: id}, {"password": password})
        .then(function (user) {
            user = user.toJSON();
            delete user.__v;
            delete user.password;
            res.send("User updated.");
        });
    }
    else {
        res.send("Need to supply a new password.");
    }
};

/*    /updatepermissionlevelbyid    */
exports.user_updatePermissionLevelById = async function (req, res) {
    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    var id = sanitize(req.body.id);
    var permissionLevel = sanitize(req.body.permissionLevel);

    if (req.body.permissionLevel) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt)
            .update(password)
            .digest("base64");
    
        password = salt + "$" + hash;
        await User.findOneAndUpdate({_id: id}, {"permissionLevel": permissionLevel})
        .then(function (user) {
            user = user.toJSON();
            delete user.__v;
            delete user.password;
            res.send("User updated.");
        });
    }
    else {
        res.send("Need to supply a new permissionLevel.");
    }
};

/*    /getall     */
exports.user_getall = async function (req, res) {

    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    await User.find()
    .then(function (users) {
        res.send(users);
    });
};

/*    /deletebyid    */
exports.user_deletebyid = async function (req, res) {

    // Admin level permission required to run this method
    if (!Auth.methods.isValidCallFromUser(req, Auth.PERMISSIONS.ADMIN)) {
        return res.send("Not authorized to call this endpoint.");
    }

    var id = sanitize(req.body.id);

    await User.deleteOne({_id: id})
    .then(function (err, result) {
        if (err) {
            res.send(err);
            return;
        }
        else {
            res.send("Delete complete.");
        }
    })
};