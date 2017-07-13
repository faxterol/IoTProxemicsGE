var config = require('./config'),
    Agenda    = require('agenda'),
    agenda    = new Agenda(),
    mongoose = require('mongoose'),
    jobTypes = ["notifications","actions"];

//mongoose.connect('mongodb://'+config.mongodb.server+':'+config.mongodb.port+'/'+config.mongodb.database); 
agenda.mongo(mongoose.connection.collection('agendaJobs').conn.db,'agendaJobs', function (err) {
    console.log("error: "+err);
});

jobTypes.forEach(function(type) {
    require('./jobs/' + type)(agenda, mongoose);
});

if (jobTypes.length > 0) {
  agenda.start();
}


// Handles graceful stopping of jobs
function graceful() {
  agenda.stop(function() {
    mongoose.disconnect(function(err){
      process.exit(0);
    });
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = agenda;