//processing movement using change of proxemics zone
module.exports = function(entity) {
    
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
    console.log("Movimiento procesado");
    console.log(JSON.stringify(entity.proxemics_data));
    
    entity.markModified('proxemics_data');
    return entity.save();
};