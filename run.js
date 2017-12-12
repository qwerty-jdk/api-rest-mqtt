const mongoose = require('mongoose');
const myConfig = require('./config');
const app = require('./app');
const mqttClent = require('./services/mqtt');

mongoose.connect(myConfig.db, { useMongoClient: true }, (err,res) => {
	if(err){
		return console.log(`Error al conectar a la base de datos: ${ err }`);
	}
	console.log("Conexión a la base de datos establecida...");

	app.listen(myConfig.port, () => {
		console.log(`API REST corriendo en http://localhost:${ myConfig.port }`);
	});
});