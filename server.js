var config = require('./config');

var express = require('express'),
  app = express(),
  port = config.ProximiThings.port,
  mongoose = require('mongoose'),
  rule_interaction = require('./api/models/RuleInteraction'),
  proxemics_action = require('./api/models/ProxemicsAction'),
  ocb_notification = require('./api/models/OCBNotification'),
  entity = require('./api/models/Entity'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  validator = require('express-validator'),
  sv = require('./lib/UnitVectorSum'),
  mqtt = require('mqtt');
  
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+config.mongodb.server+':'+config.mongodb.port+'/'+config.mongodb.database); 

app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(validator({
 customValidators: {
    isArray: function(value) {
        return Array.isArray(value);
    },
    equalsArrayElements: function(value,number){
      return value.length == number;
    }
 }
}));

var rules = require('./api/routes/RulesInteractionRoutes');
var actions = require('./api/routes/ProxemicsActionRoutes');
var ocbnot = require('./api/routes/OrionNotificationsRoutes');
var enti = require('./api/routes/EntitiesRoutes');
rules(app);
actions(app);
ocbnot(app);
enti(app);

app.use(function(req, res) {
  res.status(404).send({
    error : 404,
    msg: req.originalUrl + ' not found'
  });
  var err = new Error('Not Found');
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log("error handler: "+err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.environment === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500).end();
});

app.listen(port);

var mqtt_client  = mqtt.connect('mqtt://fiware.faxterol.com')
 
mqtt_client.on('connect', function () {
  console.log("MQTT Client connected");
})