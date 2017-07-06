//processing distance on centimeters
module.exports = function(entity) {
    
    //there is the "distance_cm" variable
    if(typeof entity.last_notification.distance_cm != "undefined"){
        console.log("processing distance from notification on centimeters");

        var distancia = parseInt(entity.last_notification.distance_cm.value);

        if(distancia <= 45) entity.proxemics_data.proxemics_zone = "INTIMATE";
        else if(distancia > 45 && distancia <= 122) entity.proxemics_data.proxemics_zone = "PERSONAL";
        else if(distancia > 122 && distancia <= 366) entity.proxemics_data.proxemics_zone = "SOCIAL";
        else if(distancia > 366) entity.proxemics_data.proxemics_zone = "PUBLIC";
        entity.proxemics_data.distance_cm = distancia;
    }
    console.log("Distancia procesado");
    console.log(JSON.stringify(entity.proxemics_data));

    entity.markModified('proxemics_data');
    return entity.save();
};
