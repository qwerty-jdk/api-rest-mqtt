'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mqttBroker = ({
    url: String,
    port: Number,
    username: String,
    password: String
});

module.exports = mongoose.model('mqttBroker', mqttBroker);