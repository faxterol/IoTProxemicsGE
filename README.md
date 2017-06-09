# ProximiThings Server
A FIWARE-enabled component for processing proxemics interaction on Internet of Things environments. This component is connected to Orion Context Broker to get raw data from entities. This component is IN DEVELOPMENT

### Features
- Create devices on Orion Context Broker
- Create rules for Proxemics Interaction based on Proxemics Dimensions from Greenberg (inspired in Hall proxemics dimensions from Antropology)
- Create actions to execute when proxemics interactions rules apply  (or not) 
- Actions are MQTT messages for devices or HTTP callbacks

### Prerequisites

To install ProximiThings Server, you need to install and configure the follow FIWARE Generic Enablers and his dependencies: 
* [Orion Context Broker](https://github.com/telefonicaid/fiware-orion)
* [IoT Agent JSON MQTT](https://github.com/telefonicaid/iotagent-json)


## API documentation   

You can find ProximiThings Server API REST resources and documentation on https://faxterol.github.io/ProximiThings-Server/. 

### Limitations

- Do you need to update proxemics dimensions on Orion Context Broker on ProxemicsInteraction service
- It does not have big data analysis


## License

ProximiThings Server is licensed under Affero General Public License (GPL) version 3.

## Acknowledgments

* Developed by Luis Carlos Cárdenas from Ensenada Research Center, México (CICESE)
* Founded by CONACYT and SMARTSDK 
* This work is a thesis project by Luis Carlos Cárdenas and directed by Dr. Antonio García Macías
* More information at: lcardenas@cicese.edu.mx
