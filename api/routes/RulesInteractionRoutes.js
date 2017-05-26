'use strict';
module.exports = function(app) {
  var rulesInteraction = require('../controllers/RulesInteractionController');


  app.route('/config/rules')
    .get(rulesInteraction.list_all_rules)
    .post(rulesInteraction.create_a_rule);


  app.route('/config/rules/:RuleID')
    .get(rulesInteraction.read_a_rule)
    .post(rulesInteraction.update_a_rule)
    .delete(rulesInteraction.delete_a_rule);
};