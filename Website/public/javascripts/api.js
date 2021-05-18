const API = 'http://localhost:8080/';
const axios = require('axios');

var methods = {

    // Calls the 'login' method inside the API
    login: function(username, password) {

        var call = API + '/auth/login';

        axios.post(call, {
            username: username,
            password: password
          })
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            return null;
          });
    }
};

module.exports = {methods};
