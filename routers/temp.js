'use strict'

const tempController = require('../controllers/temp');
const auth = require('../middelwares/auth');
const tempRouter = require('express').Router();

tempRouter.get('/temp', tempController.getTemp);
tempRouter.get('/temps', tempController.getTemps);
tempRouter.post('/temp', tempController.saveTemp);
tempRouter.put('/temp', tempController.updateTemp);
tempRouter.delete('/temp', tempController.deleteTemp);

module.exports = tempRouter;