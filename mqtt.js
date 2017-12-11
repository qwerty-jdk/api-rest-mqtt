const mqtt = require('mqtt');
const myConfig = require('./config');

const client  = mqtt.connect(myConfig.mqtt_server);

client.on('connect', (connack) => {
    console.log('MQTT conectado');

    //Aquí se indican todos los sensores a los que se suscribe para recibir publicaciones.
    client.subscribe('test');
});

client.on('message', (topic, message, package) => {
    console.log(package);
    console.log(message.toString());
    client.end();
});

module.exports = client;