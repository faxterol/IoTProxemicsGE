'use strict';
module.exports = function(app) {
  var orionNotifications = require('../controllers/OrionNotificationsController');


  app.route('/v1/ocb_notification')
    .get(orionNotifications.ocb_notification)
    .post(orionNotifications.ocb_notification);
};