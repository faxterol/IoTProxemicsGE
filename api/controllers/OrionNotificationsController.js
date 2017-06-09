'use strict';

var config = require('./../../config'),
  mongoose = require('mongoose'),
 OCBNotification = mongoose.model('OCBNotification'),
 agenda = require('./../../jobs.js');

exports.ocb_notification = function(req, res) {
  if(req.header("fiware-service") == config.ProximiThings.service.toLowerCase()){
    var new_notification = new OCBNotification(req.body);
    new_notification.save(function(err, notification) {
      if (err){
        console.log("error saving notification");
        res.send(err);
      }else{
        res.status(200);
        agenda.now('process notification', {ocb_notification: notification,headers : {"service_path" : req.header("fiware-servicepath")}});
      }
    });
  }
  else{ 
    res.status(404);
  }
};
