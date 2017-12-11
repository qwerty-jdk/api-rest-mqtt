'use strict'

const doorController = require('../controllers/door');
const auth = require('../middelwares/auth');
const doorRouter = require('express').Router();

doorRouter.get('/door', doorController.getDoor);
doorRouter.post('/door', doorController.saveDoor);
doorRouter.put('/door', doorController.updateDoor);
doorRouter.delete('/door', doorController.deleteDoor);

module.exports = doorRouter;