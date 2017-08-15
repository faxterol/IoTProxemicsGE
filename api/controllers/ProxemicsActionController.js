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
  var action_data = {};
  
  req.checkBody("identifier","identifier is empty").notEmpty();
  req.checkBody("name","name is empty").notEmpty();
  req.checkBody("description","description is empty").notEmpty();
  req.checkBody("type_action","type_action is empty").notEmpty();
  req.checkBody("type_action","type_action must be http_callback or mqtt_msg").isIn(["http_callback","mqtt_msg"]);
  req.checkBody("action","service_path is empty").notEmpty().isJSON();

  req.sanitizeBody("identifier").trim();
  req.sanitizeBody("name").trim();
  req.sanitizeBody("description").trim();
  req.sanitizeBody("type_action").trim();
  req.sanitizeBody("action").trim();

  _.forEach(req.body,function(value,key){
    if(_.indexOf(["identifier","name","description","type_action","action"],key) >= 0){
      action_data[key] = value;
    }
  });

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = {"errors" : true, "msg" : util.inspect(result.array())}
      res.status(400).send(errors);
      return;
    }
    var new_action = new ProxemicsAction(action_data);
    new_action.save(function(err, action) {
      if (err)
        res.send(err);
      res.json(action);
    });
  });
};


exports.read_an_action = function(req, res) {
  req.checkParam("ActionId","ActionId is not an ID").isMongoId().notEmpty();

  ProxemicsAction.findById(req.params.ActionId, function(err, action) {
    if (err)
      res.send(err);
    res.json(action);
  });
};


exports.update_an_action = function(req, res) {
  req.checkParam("ActionId","ActionId is not an ID").isMongoId().notEmpty();

  req.checkBody("identifier","identifier is empty").notEmpty();
  req.checkBody("name","name is empty").notEmpty();
  req.checkBody("description","description is empty").notEmpty();
  req.checkBody("type_action","type_action is empty").notEmpty();
  req.checkBody("type_action","type_action must be http_callback or mqtt_msg").isIn(["http_callback","mqtt_msg"]);
  req.checkBody("action","service_path is empty").notEmpty().isJSON();

  req.sanitizeBody("identifier").trim();
  req.sanitizeBody("name").trim();
  req.sanitizeBody("description").trim();
  req.sanitizeBody("type_action").trim();
  req.sanitizeBody("action").trim();

  _.forEach(req.body,function(value,key){
    if(_.indexOf(["identifier","name","description","type_action","action"],key) >= 0){
      action_data[key] = value;
    }
  });

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      var errors = {"errors" : true, "msg" : util.inspect(result.array())}
      res.status(400).send(errors);
      return;
    }
    ProxemicsAction.findOneAndUpdate(req.params.ActionId, req.body, {new: true}, function(err, action) {
      if (err)
        res.send(err);
      res.json(action);
    });
  });

  
};


exports.delete_an_action = function(req, res) {
  req.checkParam("ActionId","ActionId is not an ID").isMongoId().notEmpty();

  ProxemicsAction.remove({
    _id: req.params.ActionId
  }, function(err, action) {
    if (err)
      res.send(err);
    res.json({ message: 'Action successfully deleted' });
  });
};

