const door = require('../controllers/door');
const light = require('../controllers/light');
const temp = require('../controllers/temp');
const mqtt = require('mqtt');
const ServerMqtt = require('../controllers/mqttServer').getServer();

let client = undefined;
ServerMqtt.then(response => {
    let server = response;
    client = mqtt.connect(server.url, { port: server.port, username: server.username, password: server.password});
    client.on('connect', (connack) => {
        console.log('MQTT conectado');

        //Aquí se indican todos los sensores a los que se suscribe para recibir publicaciones.
        door.getAll().then(response => { 
            if(response.code == 200){
                let list = response.message;
                if(list.length > 0){
                    for(i=0;i<list.length;i++) client.subscribe('door$'+list[i].location);
                }
            }
        });

        light.getAll().then(response => {
            if(response.code == 200){
                let list = response.message;
                if(list.length > 0){
                    for(i=0;i<list.length;i++) client.subscribe('light$'+list[i].location);
                }
            }
        });

        temp.getAll().then(response => {
            if(response.code == 200){
                let list = response.message;
                if(list.length > 0){
                    for(i=0;i<list.length;i++) client.subscribe('temp$'+list[i].location);
                }
            }
        });

    });
    
    client.on('message', (header, value, package) => {
        try{
            console.log(header);
            let type = header.split('$')[0];
            let topic = header.split('$')[1];
            switch(type){
                case 'door': door.changeStatus(topic, value).then(response => console.log({ response })); break;
                case 'light': light.changeStatus(topic, value).then(response => console.log({ response })); break;
                case 'temp': temp.changeStatus(topic, value).then(response => console.log({ response })); break;
                default: console.log({header, value, message: 'No se realizaron cambios'}); break;
            }
        }catch(err){ console.log({header, value, message: `Error al realizar cambios: ${err}`}) }
    });
})
.catch(err => console.log(err));

module.exports = client;