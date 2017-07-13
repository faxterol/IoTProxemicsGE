var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  sv = require('../UnitVectorSum'),
  _ = require("lodash");
//processing distance on degress¿
module.exports = function(entity) {
    
    //there is the "orientation" variable

    if(typeof entity.last_notification.orientation_degrees != "undefined"){
        console.log("processing orientation from notification on angle (0-359°)");

        entity.proxemics_data.orientation_degrees = parseInt(entity.last_notification.orientation_degrees.value);
    }

    console.log("Find entities: "+entity.entity_id);

    var entities_query = Entity.find({$or : [
        {"proxemics_data.orientation.in_front_of" : {$in: [entity.entity_id]}},
        {"proxemics_data.orientation.in_right_of" : {$in: [entity.entity_id]}}, 
        {"proxemics_data.orientation.in_left_of" : {$in: [entity.entity_id]}}, 
        {"proxemics_data.orientation.in_back_of" : {$in: [entity.entity_id]}}]}).exec();
    entities_query.then(function(entities){
        _.each(entities,function(value){
            var e = value;
            if(typeof e.proxemics_data.location_id != "undefined")
                entity.proxemics_data.location_id = e.proxemics_data.location_id;
            
            console.log("Entity "+entity.entity_id+" ("+entity.proxemics_data.orientation_degrees+") is in "+e.proxemics_data.location_id+"("+e.proxemics_data.orientation_degrees+")");
            
            if(typeof entity.proxemics_data.orientation_degrees != "undefined" && typeof e.proxemics_data.orientation_degrees != "undefined"){
                var angle = sv(entity.proxemics_data.orientation_degrees,e.proxemics_data.orientation_degrees);

                if((angle >= 315 && angle <= 45) || (angle <= -315 && angle >= -45)){
                    //in front of
                    entity.proxemics_data.orientation.in_front_of.push(e.entity_id);
                }
                else if((angle > 45 && angle < 135) || (angle < -225 && angle > -315)){
                    //left
                    entity.proxemics_data.orientation.in_left_of.push(e.entity_id);
                }
                else if((angle > 135 && angle < 225) || (angle < -135 && angle > -225)){
                    //back
                    entity.proxemics_data.orientation.in_back_of.push(e.entity_id);
                }
                else{
                    //right
                    entity.proxemics_data.orientation.in_right_of.push(e.entity_id);
                }
            }
            console.log("Orientacion procesada");
            console.log(JSON.stringify(entity.proxemics_data));
        });
        entity.markModified('proxemics_data');
        return entity.save();
    });

    

    entity.markModified('proxemics_data');
    return entity.save();
};
