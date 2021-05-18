var sanitize = require('mongo-sanitize');
const User = require('../models/users.model');
const users_controller = require('../controllers/users.controller');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../common/config/env.config.js').jwt_secret;


/*


--------------------------ENDPOINTS--------------------


*/

/*    /test     */
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

/*    /login     */
exports.auth_login = async function (req, res) {

    var username = sanitize(req.body.username);
    var password = sanitize(req.body.password);

    var check = await isPasswordAndUserMatch(username, password, req);

    if (check) {
        try {
            let refreshId = req.body.userId + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, jwtSecret);
            let b = Buffer.from(hash);
            let refresh_token = b.toString('base64');
            res.status(201).send({accessToken: token, refreshToken: refresh_token});
        } 
        catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        res.send("Invalid username or password.");
    }

};

//------- Helper Functions ----------

async function findUser(username) {
    var user = await User.findOne({username: username});
    return user;
}

async function isPasswordAndUserMatch(username, password, req) {

    var user = await findUser(username);

    if (!user) {
        return null;
    }
    else {
        // Add in the user permission level here so that the jwt will have access to the permission level when checking authentication.
        req.body.userPermissionLevel = user.permissionLevel;
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
        if (hash === passwordFields[1]) {
            return true;
        } else {
            return false;
        }
    }
}