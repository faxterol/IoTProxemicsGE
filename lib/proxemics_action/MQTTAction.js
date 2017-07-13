var mongoose = require('mongoose'),
  mqtt = require('mqtt');


//infrared person
module.exports = function(rule,action,entity,entity_related) {
    mqtt.publish(action.publish_path,action.publish_message);
};