'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {
    const token = new Promise((resolve, reject) => {
        try{
            const payload = {
                sub: user._id,
                iat: moment().unix(),
                exp: moment().add(15, 'days').unix()    
            };
            const myToken = jwt.encode(payload, config.SECRET_TOKEN);
            resolve(myToken);
        }catch(err){
            reject({
                status: 500,
                message: `Error al crear el token: ${err}`
            });
        }
    });
    return token;
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()) reject({
                status: 401,
                message: 'El token ha expirado'
            });
        resolve(payload.sub);
        }catch(err){
            reject({
                status: 500,
                message: `Token inválido, error: ${err}`
            });
        }
    });
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};