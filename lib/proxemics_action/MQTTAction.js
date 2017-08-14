var mongoose = require('mongoose'),
  mqtt = require('mqtt'),
  config = require("../../config");

module.exports = function(rule,action,entity,entity_related) {
    var mqtt_client=mqtt.connect("mqtt://"+config.mqtt.server+":"+config.mqtt.port,config.mqtt.options);
    mqtt_client.on("connect",function(){
        mqtt_client.publish(action.action.publish_path,action.action.publish_message);
    });
};
