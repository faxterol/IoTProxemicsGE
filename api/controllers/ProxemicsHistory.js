'use strict';


var mongoose = require('mongoose'),
  util = require('util'),
  ProxemicsDataLog = mongoose.model('ProxemicsDataLog');

exports.list = function(req, res) {
    var data = {"date" : {}};

    req.checkQuery('date_from', 'date_from must be an date').isDate();
    req.checkQuery('date_to', 'date_to must be an date').isDate();
    req.checkQuery("EntityId","EntityId is not an ID").isMongoId();

    if(req.query.EntityId!=""){
        data["EntityId"] = req.query.EntityId;
    }

    if(req.query.date_from!=""){
        req.sanitizeQuery('date_from').toDate();

        data["date"] += {
            "$gte" : ISODate(req.query.date_from)
        };
    }

    if(req.query.date_to!=""){
        req.sanitizeQuery('date_to').toDate();

        data["date"] += {
            "$lt" : ISODate(req.query.date_to) 
        };
    }

    ProxemicsDataLog.find(data, function(err, history) {
        if (err){
            res.send(err);
        }
        res.json(history);
    });
};
