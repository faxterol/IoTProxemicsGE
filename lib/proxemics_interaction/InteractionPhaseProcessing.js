var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  _ = require("lodash");

//processing  distance and interaction phase
module.exports = function(entity) {
    //we need all entities near by entity after orientation processed
    var entities_nearby = [];
    _.each(entity.proxemics_data.orientation.in_front_of,function(value){
        entities_nearby.push(value);
    });
    _.each(entity.proxemics_data.orientation.in_back_of,function(value){
        entities_nearby.push(value);
    });
    _.each(entity.proxemics_data.orientation.in_left_of,function(value){
        entities_nearby.push(value);
    });
    _.each(entity.proxemics_data.orientation.in_right_of,function(value){
        entities_nearby.push(value);
    });

    var entities_query = Entity.find({"entity_id": { $in : entities_nearby}}).exec();
    entities_query.then(function(entities){
        _.each(entities,function(value){
            var entity_query = value;
            var interaction_phase = "LIMITED_DATA";
            //are on same place?
            if(entity_query.proxemics_data.location_id == entity.proxemics_data.location_id){
                interaction_phase = "AMBIENT";
            }
            if((_.indexOf(entity.proxemics_data.orientation.in_front_of,entity_query.entity_id) >= 0 
                || _.indexOf(entity.proxemics_data.orientation.in_left_of,entity_query.entity_id) >= 0
                || _.indexOf(entity.proxemics_data.orientation.in_righth_of,entity_query.entity_id) >= 0)
                && entity.proxemics_data.proxemics_zone == "SOCIAL"){
                    interaction_phase = "IMPLICIT";
            }

            if((_.indexOf(entity.proxemics_data.orientation.in_front_of,entity_query.entity_id) >= 0)
                && (entity.proxemics_data.proxemics_zone == "SOCIAL" && entity_query.proxemics_data.proxemics_zone == "SOCIAL")){
                    interaction_phase = "SUBTLE";
            }

            if((_.indexOf(entity.proxemics_data.orientation.in_front_of,entity_query.entity_id) >= 0)
                && (entity.proxemics_data.proxemics_zone == "INTIMATE" || entity.proxemics_data.proxemics_zone == "PERSONAL")
                && (entity_query.proxemics_data.proxemics_zone == "INTIMATE" || entity_query.proxemics_data.proxemics_zone == "PERSONAL")){
                    interaction_phase = "PERSONAL";
            }

            entity.proxemics_data.interaction_phase.push({
                "entity_id" : entity_query.entity_id,
                "phase" : interaction_phase
            });

            entity.markModified('proxemics_data');
        });
        return entity.save();
    }).catch(function(err){
        console.log("Error on processing interaction phase: "+err);
    });

    console.log("Interaction phase procesado");
    console.log(JSON.stringify(entity.proxemics_data));

    entity.markModified('proxemics_data');
    return entity.save();
};
