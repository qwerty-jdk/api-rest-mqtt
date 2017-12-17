'use strict'

const MqttServer = require('../models/mqttBroker');

function getMqttServer(req, res){
    
    getServer()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => res.status(err.code).send(err.message));

}

function getServer(){
    const promise = new Promise((resolve, reject) => {
        MqttServer.findOne({}, (err, data) => {
            if(err) reject({ code: 500, message: `Error al intentar buscar en la base de datos: ${err}` });
            if(!data) reject({ code: 401, message: 'mqttServer no existe' });
            resolve(data);
        });
    });
    return promise;
}

function saveMqttServer(data){

    const promise = new Promise((resolve, reject) => {
        try{
            data.save((err, doc) => {
                if(err) reject({ message: `Error al intentar guardar en la base de datos: ${err}` });
                resolve(doc);
            });
        }catch(err){ reject(err); }
    });
    return promise;

}

function updateMqttServer(req, res){
  
    if(req.body._id){
        let changes = {
            $set:{ 
                url: 'mqtt://' + req.body.url,
                port: req.body.port,
                username: req.body.username,
                password: req.body.password
            }
        };
        MqttServer.findOneAndUpdate({ _id: req.body._id }, changes, (err, data) => {
            if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
            //console.log(`updatemqttServer: ${data}`);
            res.status(200).send(data);    
        });
    } else {
        const doc = new MqttServer({
            url: 'mqtt://' + req.body.url,
            port: req.body.port,
            username: req.body.username,
            password: req.body.password
        });
        saveMqttServer(doc)
        .then(response => {
            //console.log(`savemqttServer: ${response}`);
            res.status(200).send(response);
        })
        .catch(err => { 
            console.log(`Error al guardar mqtt: ${err}`);
            res.status(500).send(err); 
        });
    }

}

module.exports = {
    getServer,
    getMqttServer,
    updateMqttServer
}