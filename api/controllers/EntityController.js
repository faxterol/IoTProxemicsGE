'use strict';


var mongoose = require('mongoose'),
  Entity = mongoose.model('Entity'),
  _ = require("lodash"),
  config = require('../../config'),
  rp = require("request-promise");;

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

    rp({
      method: 'POST',
      uri: 'http://'+config.orion.server+':'+config.orion.port+'/v2/entities',
      body: {
          "id": entity_data.entity_id,
          "type" : entity_data.entity_type
      },
      headers: {
          "Content-type" : "application/json",
          "Fiware-Service" : config.ProximiThings.service,
          "Fiware-ServicePath" : entity_data.service_path,
      },
      json : true
    })
    .catch(function (err) {
      console.log("Failed to create entity on OCB:" + err);
      return entity_query;
    });
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

