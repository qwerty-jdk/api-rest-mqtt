'use strict'

const Light = require('../models/light');

function getLight(req, res){

    Light.findOne({ location : req.body.location }, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        if(!data) res.status(401).send('Light no existe');
        //console.log(`getLight: ${data}`);
        res.status(200).send(data);
    });

}

function getLights(req, res){
    
        Light.find({}, (err, list) => {
            if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
            if(list.length > 0){
                res.status(200).send(list);
            } else res.status(401).send('No existe ningun Light');
        });
    
    }

function saveLight(req, res){

    let light = new Light({
        location: req.body.location,
        displayName: req.body.displayName,
        status: req.body.status,
        mode: req.body.mode,
        image: req.body.image
    });

    light.save((err, data) => {
        if(err) res.status(500).send(`Error al intentar guardar en la base de datos: ${err}`);
        console.log(`saveLight: ${data}`);
        res.status(200).send(data);
    });

}

function updateLight(req, res){

    let changes = {
        $set:{ 
            status: req.body.status, 
            mode: req.body.mode
        }
    };

    Light.findOneAndUpdate({ location : req.body.location }, changes, (err, data) => {
        if(err) res.status(500).send(`Error al intentar buscar en la base de datos: ${err}`);
        //console.log(`updateLight: ${data}`);
        res.status(200).send(data);    
    });

}

function deleteLight(req, res){
    
    Light.findOneAndRemove({location : req.body.location}, (err, data) => {
        if(err) res.status(500).send(`Error al intentar modificar en la base de datos: ${err}`);
        console.log(`deleteLight: ${data}`);
        res.status(200).send(data);
    });
    
}

module.exports = {
    getLight,
    getLights,
    saveLight,
    updateLight,
    deleteLight
}