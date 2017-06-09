'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Parent Schema
var OCBNotificationSchema = new Schema({
    data: {
        type: Schema.Types.Mixed,
        required: 'Enter the name of rules interaction proxemics'
    },
    subscriptionId: {
        type: String,
        required: 'Enter the description of rules interaction proxemics'
    },
    processed : {
        type: Boolean,
        default : false
    }
});

module.exports = mongoose.model('OCBNotification', OCBNotificationSchema);