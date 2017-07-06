'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionDataSchema = new Schema({
    publish_path: {
        type : String
    },
    publish_message : {
        type : String
    },
    url : {
        type : String,
    }
},{ _id : false });



//Parent Schema
var ProxemicsActionSchema = new Schema({
    identifier : {
        type: String,
        required : 'Enter an <human> identifier for action'
    },
    name: {
        type: String,
        required: 'Enter the name of rules interaction proxemics'
    },
    description: {
        type: String,
        required: 'Enter the description of rules interaction proxemics'
    },
    entity_id : {
        type: String
    },
    type_action : {
        type: String,
        required: "You must to specify the type_action. It could be an mqtt_msg or http_callback"
    },
    action : {
        type : ActionDataSchema
    }
});

module.exports = mongoose.model('ProxemicsAction', ProxemicsActionSchema);

