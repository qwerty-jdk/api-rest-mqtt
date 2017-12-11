'use strict'

const Temp = require('../models/temp');

function getTemp(req, res){

    Temp.findOne({ location : req.body.location }, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        if(!data) res.status(401).send('Temp no existe');
        //console.log(`getTemp: ${data}`);
        res.status(200).send(data);
    });

}

function getTemps(req, res){
    
        Temp.find({}, (err, list) => {
            if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
            if(list.length > 0){
                res.status(200).send(list);
            } else res.status(401).send('No existe ningun Temp');
        });
    
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

function updateTemp(req, res){
  
    let changes = {
        $set:{ 
            status: req.body.status, 
            maxTemp: req.body.maxTemp
        }
    };

    Temp.findOneAndUpdate({ location : req.body.location }, changes, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        //console.log(`updateTemp: ${data}`);
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
    saveTemp,
    updateTemp,
    deleteTemp
}