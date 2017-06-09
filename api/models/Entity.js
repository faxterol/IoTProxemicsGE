'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Parent Schema
var EntitySchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    entity_id : {
        type: String,
        required: 'Entity ID for the device. Is the same for OCB'
    },
    entity_type : {
        type: String,
        required: 'Type of entity. Is the same for OCB'
    },
    service_path : {
        type: String,
        lowercase: true,
        required: 'Service path for the device. This is complementary for service path on OCB on config'
    },
    proxemics_data : {
        type : Schema.Types.Mixed,
    },
    proxemics_data_previous : {
        type : Schema.Types.Mixed,
    },
    last_notification : {
        type: Schema.Types.Mixed,
    }
});

module.exports = mongoose.model('Entity', EntitySchema);

