//processing a proxemics dimensions
module.exports = function(entity) { 

    //validate if you have a specific parameter from notification.
    if(typeof entity.last_notification.my_parameter != "undefined"){
        
    }

    entity.markModified('proxemics_data');
    return entity.save();
};
