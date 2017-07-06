'use strict';


var mongoose = require('mongoose'),
  ProxemicsAction = mongoose.model('ProxemicsAction');

exports.list_all_actions = function(req, res) {
  ProxemicsAction.find({}, function(err, action) {
    if (err)
      res.send(err);
    res.json(action);
  });
};




exports.create_an_action = function(req, res) {
  var new_action = new ProxemicsAction(req.body);
  new_action.save(function(err, action) {
    if (err)
      res.send(err);
    res.json(action);
  });
};


exports.read_an_action = function(req, res) {
  ProxemicsAction.findById(req.params.ActionId, function(err, action) {
    if (err)
      res.send(err);
    res.json(action);
  });
};


exports.update_an_action = function(req, res) {
  ProxemicsAction.findOneAndUpdate(req.params.ActionId, req.body, {new: true}, function(err, action) {
    if (err)
      res.send(err);
    res.json(action);
  });
};


exports.delete_an_action = function(req, res) {


  ProxemicsAction.remove({
    _id: req.params.ActionId
  }, function(err, action) {
    if (err)
      res.send(err);
    res.json({ message: 'Action successfully deleted' });
  });
};

