'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Parent Schema
var ProxemicsDataLogSchema = new Schema({
    entity : {
        type: Schema.Types.ObjectId, 
        ref: 'Entity'
    },
    proxemics_data : {
        type: Schema.Types.Mixed,
    },
    date : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProxemicsDataLog', ProxemicsDataLogSchema);

