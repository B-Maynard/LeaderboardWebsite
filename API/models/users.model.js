const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 50},
    password: {type: String, required: true},
    permissionLevel: {type: Number, required: true}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);