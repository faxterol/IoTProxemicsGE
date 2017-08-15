'use strict';
module.exports = function(app) {
  var proxemicsHistory = require('../controllers/ProxemicsHistory');


  app.route('/v1/entities')
    .get(proxemicsHistory.list);
};