module.exports = {
    port : process.env.PORT || 3010,
    db : process.env.MONGODB || 'mongodb://localhost:27017/home',
    mqtt_server: process.env.MQTT_SERVER || 'mqtt://localhost:1883', //'mqtt://test.mosquitto.org'
    SECRET_TOKEN: 'mi_clave_de_token'
}