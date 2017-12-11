'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DoorSchema = ({
    location : String,
    displayName: String,
    status: { type: String, enum : ['on', 'off'] },
    image: Number
});

module.exports = mongoose.model('Door', DoorSchema);