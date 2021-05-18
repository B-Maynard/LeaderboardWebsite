// const API = require('./api');
// const app = require('../../app');
// var indexRouter = require('../../routes/index');

import { API } from './api.js';
import { app } from '../../app.js';
import { router } from '../../routes/index.js';

var methods = {

    // Calls the 'login' method inside the API and displays output accordingly
    loginHandler: function(username, password) {
        var result = API.methods.login(username, password);
        var session = app.request.session;

        if (result && result.accessToken) {
            session.accessToken = result.accessToken;
            app.use('/', router);
        }
        else {
            alert(result);
        }
    }
};

module.exports = {methods};