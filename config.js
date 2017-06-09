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
        port : 1026,
        service: '',
        servicePath : ''
    },
    mqtt : {
        server: '127.0.0.1',
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
        "MovementDistanceProcessing"
    ]
};

module.exports = config;