//=============
//PUERTO
//=============
process.env.PORT=process.env.PORT || 3000;


//=============
//ENTORNO
//=============
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';

//=============
//VENCIMIENTO DEL TOKEN
//=============
//60seg
//60min
//24hrs
//30dias
process.env.CADUCIDAD_TOKEN=60*60*24*30;


//=============
//SEED de autenticación
//=============
process.env.SEED=process.env.SEED ||'este-es-el-seed-desarrollo';

//=============
//BD
//=============
let urlDB;

if(process.env.NODE_ENV==='dev'){
	urlDB='mongodb://localhost:27017/cafe';
}else{
	urlDB=process.env.MONGO_URI;
}

process.env.URLDB=urlDB;

//=============
//Google client id
//=============
process.env.CLIENT_ID=process.env.CLIENT_ID || '317911094285-fvi8n1ocacdq3f7b089uapcqko7gmjii.apps.googleusercontent.com';