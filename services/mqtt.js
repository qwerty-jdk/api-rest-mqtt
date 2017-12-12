const door = require('../controllers/door');
const light = require('../controllers/light');
const temp = require('../controllers/temp');
const mqtt = require('mqtt');
const ServerMqtt = require('../controllers/mqttServer').getServer();

let client = undefined;
ServerMqtt.then(response => {
    if(response.code == 200){
        let server = response.message;
        client = mqtt.connect(server.url, { port: server.port, username: server.username, password: server.password});
        client.on('connect', (connack) => {
            console.log('MQTT conectado');

            //Aquí se indican todos los sensores a los que se suscribe para recibir publicaciones.
            door.Get()
            .then(response => { if(response.code == 200) client.subscribe(response.message.location) });

            light.getAll().then(response => {
                if(response.code == 200){
                    let list = response.message;
                    if(list.length > 0){
                        for(i=0;i<list.length;i++) client.subscribe(list[i].location);
                    }
                }
            });

            temp.getAll().then(response => {
                if(response.code == 200){
                    let list = response.message;
                    if(list.length > 0){
                        for(i=0;i<list.length;i++) client.subscribe(list[i].location);
                    }
                }
            });

        });
        
        client.on('message', (topic, message, package) => {
            console.log({
                topico: topic,
                message: message.toString()
            });
        });
        
        //mqttClient.publish('test','Hola Mundo');
    }
})
.catch(err => console.log(err));

module.exports = client;