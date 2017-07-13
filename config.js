var config = {
    ProximiThings : {
        port : 6253,
        environment : 'development', //To display errors
        service : 'ProxemicsInteraction',
        servicePathRoot : '/'
    },
    mongodb : {
        server: '127.0.0.1',
        port : 27017,
        database : 'proximicosas'
    },
    orion : {
        server : '127.0.0.1',
        port : 1026
    },
    mqtt : {
        server: 'fiware.faxterol.com',  
        port: 1883,
        options: {
            keepalive: 0,
            connectTimeout: 60 * 60 * 1000
        }
    },
    iotanget : {
        server : "127.0.0.1",
        port : 4021
    },
    interaction_processing : [
        "DistanceProcessing",
        "LocationProcessing",
        "MovementDistanceProcessing",
        "InfraredPerson",
        "OrientationProcessing",
        "InteractionPhaseProcessing"
    ]
};

module.exports = config;