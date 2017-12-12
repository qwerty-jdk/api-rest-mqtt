'use strict'

const mqttServerController = require('../controllers/mqttServer');
const auth = require('../middelwares/auth');
const mqttServerRouter = require('express').Router();

mqttServerRouter.get('/mqttServer', mqttServerController.getMqttServer);
mqttServerRouter.post('/mqttServer', mqttServerController.updateMqttServer);

module.exports = mqttServerRouter;