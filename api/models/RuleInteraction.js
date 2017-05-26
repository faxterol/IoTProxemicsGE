'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProxemicsRulesInteraction = new Schema({
    zone : {
        type : String,
        required : "Enter the zones available for this rule."
    },
    orientation : {
        type : String,
        required : "Enter the available orientation rule."
    },
    movement : {
        type : String,
        required : "Enter the available movement rule."
    },
    interaction_phase : {
        type : String,
        required : "Enter the available interaction phase rule."
    },
    location : {
        type : String,
        required : "Enter the available location rule."
    }
},{ _id : false });

var EntityRuleInteraction = new Schema({
    entity_id : {
        type : String,
        required : "Enter the entity id from all entity rules"
    },
    proxemics_rules : ProxemicsRulesInteraction
},{ _id : false });

var CommandRulesInteraction = new Schema({
    entity_id : {
        type : String
    },
    command : {
        type : String,
        required : "Enter the action id to execute when rules apply"
    }
},{ _id : false });



//Parent Schema
var RuleInteractionSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of rules interaction proxemics'
    },
    description: {
        type: String,
        required: 'Enter the description of rules interaction proxemics'
    },
    entities : {
        type: [EntityRuleInteraction],
        required : "Enter 2 entities for proxemics rules interaction"
    },
    commands_rules_apply : {
        type : [CommandRulesInteraction]
    },
    commands_rules_not_apply : {
        type : [CommandRulesInteraction]
    }
});

module.exports = mongoose.model('RuleInteraction', RuleInteractionSchema);