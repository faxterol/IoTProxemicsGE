var config = require('./config');

var express = require('express'),
  app = express(),
  port = config.ProximiThings.port,
  mongoose = require('mongoose'),
  rule_interaction = require('./api/models/RuleInteraction'),
  proxemics_action = require('./api/models/ProxemicsAction'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan')
  validator = require('express-validator');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+config.mongodb.server+':'+config.mongodb.port+'/'+config.mongodb.database); 

app.use(logger(config.environment));
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
rules(app);
actions(app);

app.use(function(req, res) {
  res.status(404).send({
    error : 404,
    msg: req.originalUrl + ' not found'
  })
  var err = new Error('Not Found');
  next(err);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.environment === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);


console.log('ProximiThings Server RESTful API started on port ' + port);