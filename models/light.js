'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LightSchema = ({
    location : String,
    displayName: String,
    status: { type: String, enum : ['on', 'off', 'auto'] },
    mode: { type: String, enum: ['low', 'medium', 'high']},
    image: Number,
    methodName: String
});

module.exports = mongoose.model('Light', LightSchema);