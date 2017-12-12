'use strict'

const Temp = require('../models/temp');

function getTemp(req, res){

    Temp.findOne({ location : req.body.location }, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        if(!data) res.status(401).send('Temp no existe');
        console.log(`getTemp: ${data}`);
        res.status(200).send(data);
    });

}

function getTemps(req, res){
    
    getAll()
    .then(response => res.status(response.code).send(response.message))
    .catch(response => res.status(response.code).send(response.message));
    
}

function getAll(){
    const promise = new Promise((resolve, reject) => {
        Temp.find({}, (err, list) => {
            if(err) reject({ code: 500, message: `Error al intentar buscar en la base de datos: ${err}` });
            if(list.length > 0) resolve({ code: 200, message: list });
            else reject({ code: 401, message: 'No existe ningun Temp' });
        });
    });
    return promise;
}

function saveTemp(req, res){

    let temp = new Temp({
        location: req.body.location,
        displayName: req.body.displayName,
        status: req.body.status,
        maxTemp: req.body.maxTemp,
        image: req.body.image
    });

    temp.save((err, data) => {
        if(err) res.status(500).send(`Error al intentar guardar en la base de datos: ${err}`);
        //console.log(`saveTemp: ${data}`);
        res.status(200).send(data);
    });

}

function changeStatus(topic, value){
    const promise = new Promise((resolve, reject) => {
        let changes = { 
            $set:{ 
                status: value.toString().split(':')[0], 
                maxTemp: value.toString().split(':')[1]
            } 
        };
        Temp.findOneAndUpdate({location: topic}, changes, (err, data) => {
            if(err) reject({ code:500, message: `Error al tratar de cambiar el estado: ${err}` });
            resolve({ code: 200, message: data });
        });
    });
    return promise;
}

function updateTemp(req, res){
  
    let changes = {
        $set:{ 
            status: req.body.status, 
            maxTemp: req.body.maxTemp
        }
    };

    Temp.findOneAndUpdate({ location : req.body.location }, changes, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        console.log(`updateTemp: ${data}`);
        res.status(200).send(data);    
    });

}

function deleteTemp(req, res){
    
    Temp.findOneAndRemove({location : req.body.location}, (err, data) => {
        if(err) res.status(500).send(`Error al intentar modificar en la base de datos: ${err}`);
        //console.log(`deleteTemp: ${data}`);
        res.status(200).send(data);
    });
    
}

module.exports = {
    getTemp,
    getTemps,
    getAll,
    saveTemp,
    changeStatus,
    updateTemp,
    deleteTemp
}