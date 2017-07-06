'use strict';


var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  _ = require("lodash");

exports.list_all_entities = function(req, res) {
  Entity.find({}, function(err, entities) {
    if (err)
      res.send(err);
    res.json(entities);
  });
};




exports.create_an_entity = function(req, res) {
  var entity_data = {};

  _.forEach(req.body,function(value,key){
    if(_.indexOf(["name","description","entity_id","entity_type","entity_attributes","service_path"],key) >= 0){
      entity_data[key] = value;
    }
  });

  var new_entity = new Entity(entity_data);
  new_entity.save(function(err, entity) {
    if (err)
      res.send(err);
    res.json(entity);
  });
};


exports.read_an_entity = function(req, res) {
  Entity.findById(req.params.EntityId, function(err, entity) {
    if (err)
      res.send(err);
    res.json(entity);
  });
};


exports.update_an_entity = function(req, res) {
  var entity_data = {};

  _.forEach(req.body,function(value,key){
    if(_.indexOf(["name","description","entity_id","entity_type","entity_attributes","service_path"],key) >= 0){
      entity_data[key] = value;
    }
  });

  Entity.findOneAndUpdate(req.params.EntityId, entity_data, {new: true}, function(err, entity) {
    if (err)
      res.send(err);
    res.json(entity);
  });
};


exports.delete_an_entity = function(req, res) {
  Entity.remove({
    _id: req.params.EntityId
  }, function(err, entity) {
    if (err)
      res.send(err);
    res.json({ message: 'Entity successfully deleted' });
  });
};

