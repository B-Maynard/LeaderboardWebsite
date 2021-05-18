const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GameSchema = new Schema({
    name: {type: String, required: true, max: 50},
    maps: {type: Array, required: false},
    modes: {type: Array, required: false}
});


// Export the model
module.exports = mongoose.model('Game', GameSchema);