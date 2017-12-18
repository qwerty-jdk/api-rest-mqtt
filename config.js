module.exports = {
    port : process.env.PORT || 3010,
    db : process.env.MONGODB || 'mongodb://localhost:1883/home',
    SECRET_TOKEN: 'mi_clave_de_token'
}