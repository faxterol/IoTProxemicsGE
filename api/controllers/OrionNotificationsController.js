'use strict';

var config = require('./../../config'),
  mongoose = require('mongoose'),
 OCBNotification = mongoose.model('OCBNotification'),
 agenda = require('./../../jobs.js');

module.exports.ocb_notification = function(req, res,next ){
  console.log("notification received");
  if(req.header("fiware-service") == config.ProximiThings.service.toLowerCase()){
    var new_notification = new OCBNotification(req.body);
    new_notification.save(function(err, notification) {
      if (err){
        console.log("error saving notification");
        res.status(500).end();
        res.send(err);
        next();
      }else{
        console.log("processing notification");
        res.status(200).end();
        agenda.now('process notification', {ocb_notification: notification,headers : {"service_path" : req.header("fiware-servicepath")}});
      }
    });
  }
  else{ 
    res.status(404);
    res.json({"error":true,"message":"Notification must be from Orion Context Broker"});
    next();
  }
};
