//processing distance on centimeters
module.exports = function(entity) {
    
    //there is the "distance" variable

    if(typeof entity.last_notification.distance != "undefined"){
        console.log("processing distance from notification on centimeters");

        var distancia = parseInt(entity.last_notification.distance.value);

        if(distancia <= 45) entity.proxemics_data.proxemics_zone = "INTIMATE";
        else if(distancia > 45 && distancia <= 122) entity.proxemics_data.proxemics_zone = "PERSONAL";
        else if(distancia > 122 && distancia <= 366) entity.proxemics_data.proxemics_zone = "SOCIAL";
        else if(distancia > 366) entity.proxemics_data.proxemics_zone = "PUBLIC";
        entity.proxemics_data.distance_cm = distancia;
    }

    entity.markModified('proxemics_data');
    return entity.save();
};
