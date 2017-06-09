//processing movement using change of proxemics zone
module.exports = function(entity) {
    console.log("proxemics_data: "+typeof entity.proxemics_data.movement);
    console.log("proxemics_data_previous: "+typeof entity.proxemics_data_previous.proxemics_zone);
    if(typeof entity.proxemics_data.movement != "undefined" && typeof entity.proxemics_data_previous.proxemics_zone != "undefined"){
        console.log("Processing movement throught proxemic zone");
        if(entity.proxemics_data.proxemics_zone == entity.proxemics_data_previous.proxemics_zone){
            entity.proxemics_data.movement = "IDLE";
        }
        else{
            entity.proxemics_data.movement = "IN_MOVEMENT";
        }
    }
    else{
        entity.proxemics_data.movement = "IDLE";
    }
    
    entity.markModified('proxemics_data');
    return entity.save();
};