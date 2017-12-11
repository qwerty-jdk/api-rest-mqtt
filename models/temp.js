'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TempSchema = ({
    location : String,
    displayName: String,
    status: { type: String, enum : ['on', 'off', 'auto'] },
    maxTemp: Number,
    image: Number
});

module.exports = mongoose.model('Temp', TempSchema);