var DistanceProcessing = require('./../lib/proxemics_interaction/DistanceProcessing');
var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  OCBNotification = mongoose.model('OCBNotification'),
  config = require('./../config');

module.exports = function(agenda,mongoose) {

  agenda.define('process notification', function(job, done) {
    
    if(job.attrs.data.ocb_notification.data.length > 0){
      //Notifications are send inmediately after update OCB. In all cases, only one update has sent by OCB
      var notification = job.attrs.data.ocb_notification.data[0];


      var promise_entity = Entity.findOne({"entity_id" : notification.id,"entity_type" : notification.type,"service_path" : job.attrs.data.headers.service_path}).exec();
      
      promise_entity = promise_entity.then(function ( entity_query) {
        if(entity_query == null){
          //create the entity
          var new_entity = new Entity({
            "entity_id" : notification.id,
            "entity_type" : notification.type,
            "service_path" : job.attrs.data.headers.service_path,
            "proxemics_data" : {},
            "proxemics_data_previous" : {},
            "last_notification" : notification
          });

          return new_entity.save();
        }
        else{
          //update entity
          entity_query.proxemics_data_previous = entity_query.proxemics_data;
          entity_query.proxemics_data = {};
          entity_query.last_notification = notification;

          entity_query.markModified('proxemics_data_previous');
          entity_query.markModified('proxemics_data');
          entity_query.markModified('last_notification');

          return entity_query.save();
        }
      });

      //process interaction proxemics
      config.interaction_processing.forEach(function(file){
        promise_entity = promise_entity.then(function(entity) {   
            return require("./../lib/proxemics_interaction/"+file+".js")(entity); //return entity every time
        },function(error){
          console.log('error:', error);
        });

      });

      promise_entity = promise_entity.then(function(entity){
        return OCBNotification.findById(job.attrs.data.ocb_notification._id)
        .then(function(notification){
          notification.processed = true;
          return notification.save();
        })
        .then(function(notification){
          return entity;
        })
        .catch(function(error){
          console.log("error on saving notification: "+error);
        });
      });
    }
  });

};