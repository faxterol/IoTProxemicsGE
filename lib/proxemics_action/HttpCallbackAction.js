var mongoose = require('mongoose'),
  rp = require("request-promise");


//infrared person
module.exports = function(rule,action,entity,entity_related) {
    return rp({
        method: 'POST',
        uri: action.url,
        body: JSON.parse(action.publish_message),
        json: true // Automatically stringifies the body to JSON
    })
    .then(function (parsedBody) {
        console.log("Action "+action.identifier+" executed successfully");
    })
    .catch(function (err) {
       console.log("Error on execute action "+action.identifier+": "+err);
    });
};