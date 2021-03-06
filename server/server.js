require('./config/config.js')
const express = require('express');
const mongoose=require('mongoose');
const path=require('path');

const app = express();
const bodyParser=require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
 app.use(require('./routes/index.js'));
 
//habilitar el publicr
 app.use(express.static(path.resolve(__dirname, '../public')));
//CONEXION
mongoose.connect(process.env.URLDB,(err,res)=>{
	if(err)throw err;
	console.log('Base de datos ONLINE');
});






app.listen(process.env.PORT, ()=>{
	console.log('Escuchando puerto:',process.env.PORT);
})