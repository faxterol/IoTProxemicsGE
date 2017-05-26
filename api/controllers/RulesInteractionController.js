'use strict';


var mongoose = require('mongoose'),
  RuleInteraction = mongoose.model('RuleInteraction');

exports.list_all_rules = function(req, res) {
  RuleInteraction.find({}, function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};




exports.create_a_rule = function(req, res) {
  var new_rule = new RuleInteraction(req.body);
  new_rule.save(function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};


exports.read_a_rule = function(req, res) {
  RuleInteraction.findById(req.params.RuleId, function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};


exports.update_a_rule = function(req, res) {
  RuleInteraction.findOneAndUpdate(req.params.RuleId, req.body, {new: true}, function(err, rule) {
    if (err)
      res.send(err);
    res.json(rule);
  });
};


exports.delete_a_rule = function(req, res) {


  RuleInteraction.remove({
    _id: req.params.RuleId
  }, function(err, rule) {
    if (err)
      res.send(err);
    res.json({ message: 'Rule successfully deleted' });
  });
};

