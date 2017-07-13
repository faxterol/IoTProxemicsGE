var mongoose = require('mongoose'),
  rp = require("request-promise");


//infrared person
module.exports = function(rule,action,entity,entity_related) {
    return rp({
        method: 'POST',
        uri: action.action.url,
        body: JSON.parse(action.action.publish_message),
        json: true,
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(function (parsedBody) {
        console.log("Action "+action.identifier+" executed successfully");
        console.log(parsedBody);
    })
    .catch(function (err) {
       console.log("Error on execute action "+action.identifier+": "+err);
    });
};