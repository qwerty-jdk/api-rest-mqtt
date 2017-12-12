'use strict'

const Door = require('../models/door');

function getDoor(req, res){

    Door.findOne({ location : req.headers.location }, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        if(!data) res.status(401).send('Door no existe');
        console.log(`getDoor: ${data}`);
        res.status(200).send(data);
    });

}

function Get(){

    const promise = new Promise((resolve, reject) => {
        Door.find({}, (err, list) => {
            if(err) reject({ code: 500, message: `Error al intentar buscar en la base de datos: ${err}` });
            if(list.length > 0) resolve({ code: 200, message: list[0] });
            else reject({ code: 401, message: 'No existe ningun Door' });
        });
    });
    return promise;

}

function saveDoor(req, res){

    let door = new Door({
        location: req.body.location,
        displayName: req.body.displayName,
        status: req.body.status,
        image: req.body.image
    });

    door.save((err, data) => {
        if(err) res.status(500).send(`Error al intentar guardar en la base de datos: ${err}`);
        console.log(`saveDoor: ${data}`);
        res.status(200).send(data);
    });

}

function changeStatus(topic, value){
    const promise = new Promise((resolve, reject) => {
        let changes = { $set:{ status: value } };
        Door.findOneAndUpdate({location: topic}, changes, (err, data) => {
            if(err) reject({ code:500, message: `Error al tratar de cambiar el estado: ${err}` });
            resolve({ code: 200, message: data });
        });
    });
    return promise;
}

function updateDoor(req, res){

    let changes = {
        $set:{ 
            status: req.body.status, 
            image: req.body.image 
        }
    };

    Door.findOneAndUpdate({ location : req.body.location }, changes, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        console.log(`updateDoor: ${data}`);
        res.status(200).send(data);    
    });

}

function deleteDoor(req, res){
    
    Door.findOneAndRemove({location : req.body.location}, (err, data) => {
        if(err) res.status(500).send(`Error al intentar modificar en la base de datos: ${err}`);
        console.log(`deleteDoor: ${data}`);
        res.status(200).send(data);
    });
    
}

module.exports = {
    getDoor,
    Get,
    changeStatus,
    saveDoor,
    updateDoor,
    deleteDoor
}