'use strict';
module.exports = function(app) {
  var entityController = require('../controllers/EntityController');


  app.route('/v1/entities')
    .get(entityController.list_all_entities)
    .post(entityController.create_an_entity);


  app.route('/v1/entities/:EntityId')
    .get(entityController.read_an_entity)
    .post(entityController.update_an_entity)
    .delete(entityController.delete_an_entity);
};