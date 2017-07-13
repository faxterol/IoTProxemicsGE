var _ = require("lodash");
//processing match between entity and his rules
module.exports = function(proxemics_rules,entity,entity_related) {
    //validating zone
    var zone_result = false;
    if(typeof proxemics_rules.zone != "undefined" && proxemics_rules.zone != "" && proxemics_rules.zone != "*"){
        var zones = _.split(proxemics_rules.zone,"|");
        zones = _.map(zones,function(n){
            return _.toLower(n);
        });
        
        zone_result = zone_result || _.indexOf(zones,_.toLower(entity.proxemics_data.proxemics_zone)) >= 0;
    }
    else{
        zone_result = true;
    }
    console.log("Entity "+entity.entity_id+" zone match: "+zone_result);

    //validation movement
    var movement_result = false;
    if(typeof proxemics_rules.movement != "undefined" && proxemics_rules.movement != "" && proxemics_rules.movement != "*"){
        var movements = _.split(proxemics_rules.movement,"|");
        movements = _.map(movements,function(n){
            return _.toLower(n);
        });
        
        movement_result = movement_result || _.indexOf(movements,_.toLower(entity.proxemics_data.movement)) >= 0;
    }
    else{
        movement_result = true;
    }
    console.log("Entity "+entity.entity_id+" movement match: "+movement_result);

     //validation orientation
    var orientation_result = false;
    if(typeof proxemics_rules.orientation != "undefined" && proxemics_rules.orientation != "" && proxemics_rules.orientation != "*"){
        var orientations = _.split(proxemics_rules.movement,"|");

        for(var i = 0;i < orientations.length;i++){
            var orientations_parts = _.split(orientations[i],":");
            var entities = _.split(orientations_parts[1],",");

            var front_of_result = true;
            if(_.startsWith(_.toLower(orientations_parts[0]),"front_of")){
               for(var x = 0;x<entities.length;x++){
                   front_of_result = front_of_result && _.indexOf(entity.proxemics_data.orientation.in_front_of,entities[x]) >= 0;
               }
            }

            var left_of_result = true;
            if(_.startsWith(_.toLower(orientations_parts[0]),"left_of")){
                for(var x = 0;x<entities.length;x++){
                   left_of_result = left_of_result && _.indexOf(entity.proxemics_data.orientation.in_left_of,entities[x]) >= 0;
               }
            }
            
            var right_of_result = true;
            if(_.startsWith(_.toLower(orientations_parts[0]),"right_of")){
                for(var x = 0;x<entities.length;x++){
                   right_of_result = right_of_result && _.indexOf(entity.proxemics_data.orientation.in_right_of,entities[x]) >= 0;
               }
            }

            var right_of_result = true;
            if(_.startsWith(_.toLower(orientations_parts[0]),"back_of")){
                for(var x = 0;x<entities.length;x++){
                   right_of_result = right_of_result && _.indexOf(entity.proxemics_data.orientation.in_back_of,entities[x]) >= 0;
               }
            }

            orientation_result = orientation_result || (front_of_result && left_of_result && right_of_result && right_of_result);
        }
    }
    else{
        orientation_result = true;
    }
    console.log("Entity "+entity.entity_id+" orientation match: "+orientation_result);

    var location_result = false;
    if(typeof proxemics_rules.location != "undefined" && proxemics_rules.location != "" && proxemics_rules.location != "*"){
        var locations = _.split(proxemics_rules.location,"|");
        
        for(var i = 0;i < locations.length;i++){
            var location_parts = _.split(locations[i],":");
            var locations_entities = _.split(location_parts[1],",");

            var location_in_result = true;
            if(_.startsWith(_.toLower(location_parts[0])) == "in"){
                for(var x = 0;x<locations_entities.length;x++){
                    location_in_result = location_in_result && (entity.proxemics_data.location_id == locations_entities[x]);
                }
            }
            
            var location_out_result = true;
            if(_.startsWith(_.toLower(location_parts[0])) == "out"){
                for(var x = 0;x<locations_entities.length;x++){
                    location_out_result = location_out_result && (entity.proxemics_data.location_id != locations_entities[x]);
                }
            }

            location_result = location_result || (location_in_result && location_out_result);
        }
    }
    else{
        location_result = true;
    }
    console.log("Entity "+entity.entity_id+" location match: "+location_result);

    // interaction phase
    var interphase_result = false;
    if(typeof proxemics_rules.interaction_phase != "undefined" && proxemics_rules.interaction_phase != "" && proxemics_rules.interaction_phase != "*"){
        var interphases = _.split(proxemics_rules.interaction_phase,"|");
        //find the entity related with interaction phase
        for(var x=0;x<entity.proxemics_data.interaction_phase.length;x++){
            if(entity.proxemics_data.interaction_phase[x].entity_id == entity_related.entity_id){
                console.log("matching "+JSON.stringify(interphases)+" with "+entity.proxemics_data.interaction_phase[x].phase);
                interphase_result = interphase_result || _.indexOf(interphases,entity.proxemics_data.interaction_phase[x].phase)>=0;
            }
        }
    }
    else{
        interphase_result = true;
    }
    console.log("Entity "+entity.entity_id+" interaction phase match: "+interphase_result+"");
    
    return zone_result && movement_result && orientation_result && location_result && interphase_result;
};
