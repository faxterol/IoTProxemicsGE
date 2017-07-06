var mongoose = require('mongoose'),
  RuleInteraction = mongoose.model('RuleInteraction'),
  Entity = mongoose.model('Entity'),
  ProxemicsAction = mongoose.model('ProxemicsAction'),
  config = require('./../config'),
  _ = require("lodash"),
  rules_interaction_processing = require('./../lib/proxemics_action/RulesInteractionProcessing'),
  HttpCallbackAction = require('./../lib/proxemics_action/HttpCallbackAction');

module.exports = function(agenda,mongoose) {
    agenda.define('process proxemics rules interaction', function(job, done) {
        var entity = job.attrs.data.entity;

        //find all rules that entity is related
        var proxemics_rules_query = RuleInteraction.find({'entities.entity_id' : entity.entity_id}).exec();
        proxemics_rules_query.then(function(rules){
            //extract all rules
            _.each(rules,function(value){
                var rule = value;
                //get the second entity
                var related_index = rule.entities[0].entity_id==entity.entity_id?1 : 0;
                var entity_query = Entity.find({'entity_id' : rule.entities[related_entity].entity_id});
                entity_query.then(function(entity_related){
                    var entity_match = rules_interaction_processing(rule.entities[related_entity%1].proxemics_rules,entity,entity_related);
                    var entity_related_match = rules_interaction_processing(rule.entities[related_entity].proxemics_rules,entity_related,entity);

                    return {"match" : entity_match && entity_related_match, "entity_related" : entity_related};
                })
                .then(function(datos){
                    if(datos["match"]){
                        for(var x = 0;x<rule.commands_rules_apply.length;x++){
                            var findvars = {'identifier' : rule.commands_rules_apply[x].command};
                            if(typeof rule.commands_rules_apply[x].entity_id != "undefined"){
                                findvars['entity_id'] = rule.commands_rules_apply[x].entity_id;
                            }
                            var actions_query = ProxemicsAction.findOne(findvars).exec().then(function(action){
                                if(_.toLower(action.type) == "http_callback"){
                                    HttpCallbackAction(rule,action,entity,datos["entity_related"]);
                                }

                                if(_.toLower(action.type) == "mqtt_msg"){
                                    
                                }
                            }).catch(function(err){
                                console.log("Error on rules: "+err);
                            });
                        }
                    }
                    else{
                        for(var x = 0;x<rule.commands_rules_not_apply.length;x++){
                            
                        }
                    }
                })
                .catch(function(err){
                    console.log("Error on match rules: "+err);
                });
            });
        });
    });
};