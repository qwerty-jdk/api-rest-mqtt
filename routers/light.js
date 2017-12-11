'use strict'

const lightController = require('../controllers/light');
const auth = require('../middelwares/auth');
const lightRouter = require('express').Router();

lightRouter.get('/light', lightController.getLight);
lightRouter.get('/lights', lightController.getLights);
lightRouter.post('/light', lightController.saveLight);
lightRouter.put('/light', lightController.updateLight);
lightRouter.delete('/light', lightController.deleteLight);

module.exports = lightRouter;