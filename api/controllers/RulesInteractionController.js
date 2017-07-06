'use strict';


var mongoose = require('mongoose'),
  util = require('util'),
  RuleInteraction = mongoose.model('RuleInteraction');

exports.list_all_rules = function(req, res) {
  RuleInteraction.find({}, function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};




exports.create_a_rule = function(req, res) {
  req.checkBody('name', 'Name for Rule Interaction is required').notEmpty();
  req.checkBody('description', 'A descripción for Rule Interaction is required').notEmpty();
  req.checkBody('entities', 'entities for Rule Interaction is required').notEmpty();
  req.checkBody('entities', 'entities for Rule Interaction must be an array').isArray();
  req.checkBody('entities', 'entities must have only two elements').equalsArrayElements(2);
  req.checkBody('commands_rules_not_apply', 'commands_rules_apply must be an array').isArray();
  req.checkBody('commands_rules_apply', 'commands_rules_not_apply must be an array').isArray();

  var new_rule = new RuleInteraction(req.body);
  new_rule.save(function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};


exports.read_a_rule = function(req, res) {
  req.checkParams('RuleId', 'RuleId is required').notEmpty();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = {"errors" : true, "msg" : util.inspect(result.array())}
      res.status(400).send(errors);
      return;
    }
    RuleInteraction.findById(req.params.RuleId, function(err, rule) {
      if (err){
        var errors = {"errors" : true, "msg" : err}
        res.status(404).send(errors);
      }
      res.json(rule);
    });
  });

  
};


exports.update_a_rule = function(req, res) {
  RuleInteraction.findOneAndUpdate(req.params.RuleId, req.body, {new: true}, function(err, rule) {
    if (err){
        var errors = {"errors" : true, "msg" : err}
        res.status(404).send(errors);
      }
    res.json(rule);
  });
};


exports.delete_a_rule = function(req, res) {
  req.checkParams('RuleId', 'RuleId is required').notEmpty();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = {"errors" : true, "msg" : util.inspect(result.array())}
      res.status(400).send(errors);
      return;
    }

    RuleInteraction.remove({
      _id: req.params.RuleId
    }, function(err, rule) {
      if (err){
        var errors = {"errors" : true, "msg" : err}
        res.status(404).send(errors);
        return ;
      }
      res.json({ message: 'Rule successfully deleted' });
    });
  });

  
};

