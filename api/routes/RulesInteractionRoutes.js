'use strict';
module.exports = function(app) {
  var rulesInteraction = require('../controllers/RulesInteractionController');


  app.route('/v1/rules')
    .get(rulesInteraction.list_all_rules)
    .post(rulesInteraction.create_a_rule);


  app.route('/v1/rules/:RuleId')
    .get(rulesInteraction.read_a_rule)
    .put(rulesInteraction.update_a_rule)
    .delete(rulesInteraction.delete_a_rule);
};