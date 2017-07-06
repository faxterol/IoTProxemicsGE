//processing location
module.exports = function(entity) {
    
    //there is the "distance" variable
    if(typeof entity.last_notification.location_id != "undefined"){
        console.log("processing location from notification");

        entity.proxemics_data.location_id = entity.last_notification.location_id.value;
    }
    console.log("Location procesado");
    console.log(JSON.stringify(entity.proxemics_data));

    entity.markModified('proxemics_data');
    return entity.save();
};
