var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  sv = require('../UnitVectorSum'),
  config = require('../../config'),
  rp = require("request-promise");


//infrared person
module.exports = function(entity) {
    
    //there is the "infrared_person" variable

    if(typeof entity.last_notification.infrared_person != "undefined"){
        //infrared_person is an infrared command using 32 bits in this format: <12 bits for people id><10 bits for distance><9 bits for orientation>
        var ir = parseInt("0x"+entity.last_notification.infrared_person.value);

        var ir_base2 = ir.toString(2);
        var ir_bits = [];
        for(var i = 0;i<32-ir_base2.length;i++){
            ir_bits[i] = 0;
        }
        for(var i = 0;i<ir_base2.length;i++){
            ir_bits[32-ir_base2.length+i] = ir_base2[i];
        }

        var ir_person = parseInt(ir_bits.slice(20, 32).join(""),2).toString(16);
        var ir_distance = parseInt(ir_bits.slice(10, 20).join(""),2);
        var ir_orientation =  parseInt(ir_bits.slice(1, 10).join(""),2);



        var entity_ir = Entity.findOne({"entity_attributes.infrared_entity_id" : ir_person}).exec();
        entity_ir = entity_ir.then(function ( entity_query) {
            if(entity_query != null){
                entity.proxemics_data.orientation.in_front_of.push(entity_query.entity_id);
                console.log(JSON.stringify(entity.proxemics_data));
                entity.save();
                return entity_query;
            }else{
                throw new Error("Infrared entity ID not exists");
            }
        })
        .then(function(entity_query){
            return rp({
                method: 'POST',
                uri: 'http://'+config.orion.server+':'+config.orion.port+'/v2/entities/'+entity_query.entity_id+'/attrs',
                body: {
                    "distance_cm": {
                        "type": "integer",
                        "value" : ir_distance
                    },
                    "orientation_degrees" : {
                        "type" : "integer",
                        "value" : ir_orientation
                    },
                    "location_id" : {
                        "type" : "Location",
                        "value" : entity.proxemics_data.location_id
                    }
                },
                headers: {
                    "Content-type" : "application/json",
                    "Fiware-Service" : config.ProximiThings.service,
                    "Fiware-ServicePath" : entity_query.service_path,
                },
                json : true
            })
            .catch(function (err) {
                console.log("Failed to send Infrared data to OCB Entity:" + err);
                return entity_query;
            });
        })
        .catch(function(err){
            console.log(err);
        });

    }
    console.log("Infrarojo procesado");
    

    entity.markModified('proxemics_data');
    return entity.save();
};
