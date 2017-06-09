'use strict';
module.exports = function(app) {
  var proxemicsActions = require('../controllers/ProxemicsActionController');


  app.route('/v1/actions')
    .get(proxemicsActions.list_all_actions)
    .post(proxemicsActions.create_an_action);


  app.route('/v1/actions/:ActionId')
    .get(proxemicsActions.read_an_action)
    .post(proxemicsActions.update_an_action)
    .delete(proxemicsActions.delete_an_action);
};