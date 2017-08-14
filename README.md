# ProximiThings Server
A FIWARE-enabled component for processing proxemics interaction on Internet of Things environments. This component is connected to Orion Context Broker to get raw data from entities. This component is IN DEVELOPMENT

### Features
- Create devices on Orion Context Broker
- Create rules for Proxemics Interaction based on Proxemics Dimensions from Greenberg (inspired in Hall proxemics dimensions from Antropology)
- Create actions to execute when proxemics interactions rules apply  (or not) 
- Actions are MQTT messages for devices or HTTP callbacks

### Prerequisites

To install ProximiThings Server, you need to install and configure the follow FIWARE Generic Enablers and his dependencies: 
* NodeJS v6.10 or after (I use this version for development)
* [Orion Context Broker](https://github.com/telefonicaid/fiware-orion)
* [IoT Agent JSON MQTT](https://github.com/telefonicaid/iotagent-json) (optional)

## Install and build

In order to install and run an instance of ProximiThings, you need to do next: 

* Clone this repository
```
git clone https://github.com/faxterol/ProximiThings-Server.git
```
* Install all NodeJS dependencies and libraries. (If you have linux or mac, you may need sudoing this command)
```
npm install
```

* Run ProximiThings
```
npm start
```

Optionally, you can use this command
```
node server.js
```

Open your browser and enter to http://localhost:6253 to sure that ProximiThings is running.

## Configuration

On ProximiThings root folder project, there is a config.js file with some parameters for configuration.

⋅⋅* ProximiThings: In this paremeter, you can configure ProximiThings-related service. 
⋅⋅*  mongodb: MongoDB connection details
⋅⋅*  orion: Connection details to Orion Context Broker. This is needle to create entities or send measurement data to OCB
⋅⋅*  mqtt: MQTT broker connection
⋅⋅*  interaction_processing: File names of lib/proxemics_interaction files to process proxemic interaction on ProximiThings. The order of processing is given with the order of array position. 0 index is the first file to execute. 

## API documentation   

You can find ProximiThings Server API REST resources and documentation on https://faxterol.github.io/ProximiThings-Server/. 

### API REST Resources

| Method | PATH                    | Description                                                                                                                            |
|--------|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /v1/rules               |  Show proxemics interaction rules availables on ProximiThings for entities to process proxemics actions                   |
| POST   | /v1/rules               |  Create a new proxemics interaction rule                                                                                        |
| POST   | /v1/rules/{RuleID}      | Update a proxemics interaction rule                                                                                           |
| DELETE | /v1/rules/{RuleID}      | Delete a proxemics interaction rule                                                                                             |
| GET    | /v1/actions             | Show proxemics actions list available on ProximiThings.                                                                                            |
| POST   | /v1/actions             | Create a new proxemics action                                                                                                                  |
| POST   | /v1/actions/{ActionID}  | Update a proxemics action.                                                                    |
| DELETE | /v1/actions/{ActionID}  | Delete a proxemics action.                                                                      |
| GET    | /v1/entities            | Show a list of entities availables on ProximiThings                                                       |
| POST   | /v1/entities            | Create a new entity on ProximiThings and OCB                                                             |
| POST   | /v1/entities/{EntityID} | Update an entity ONLY on ProximiThings.                                                                |
| DELETE | /v1/entities/{EntityID} | Delete an entity from ProximiThings                                                                |
| GET    | /v1/proxemics-history   | Show a list of proxemics dimensions measurements in a timelist. |


## Limitations

- You need to update proxemics dimensions on Orion Context Broker on ProxemicsInteraction service
- It does not have big data analysis


## License

ProximiThings Server is licensed under Affero General Public License (GPL) version 3.

## Acknowledgments

* Developed by Luis Carlos Cárdenas from Ensenada Research Center, México (CICESE)
* Founded by CONACYT and SMARTSDK 
* This work is a thesis project by Luis Carlos Cárdenas and directed by Dr. Antonio García Macías
* More information at: lcardenas@cicese.edu.mx
