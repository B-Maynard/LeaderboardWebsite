const jwt = require('jsonwebtoken');
const jwtSecret = require('../common/config/env.config.js').jwt_secret;

// The list of methods that can be used from this util file.
var methods = {

    // Call this method in each endpoint to make sure the call is valid.
    // Will check the jwt, as well as permissions.
    isValidCallFromUser: function(req, permissionLevel) {
        var validJwt = this.validJWTNeeded(req);
        if (validJwt) {
            // Make sure that not only is the jwt valid, but also that the user can even make the call.
            return this.checkPermissions(req.jwt.userPermissionLevel, permissionLevel);
        }
        else {
            return false;
        }
    },

    // Checks the permissions level of the user. 
    // Requires: the user object, and the required permissions level needed to access the object.
    checkPermissions: function(userPermissionLevel, permission) {
        if (userPermissionLevel == permission.value) {
            return true;
        }
        else {
            return false;
        }
    },

    // Checks to see if a valid JWT was passed in a request
    validJWTNeeded: function(req) {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return false;
                } else {
                    req.jwt = jwt.verify(authorization[1], jwtSecret);
                    return true;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            return null;
        }
    }
};

// List of permission types allowed to be assigned to users.
const PERMISSIONS = {
    NORMAL : {value: 1, name: "Normal"},
    ADMIN : {value: 5, name: "Admin"}
};

// Exports the methods to be used outside this file.
module.exports = {methods, PERMISSIONS};
