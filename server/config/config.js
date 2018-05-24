//=============
//PUERTO
//=============
process.env.PORT=process.env.PORT || 3000;


//=============
//ENTORNO
//=============
process.env.NODE_ENV=process.env.NODE_ENV || 'dev';


//=============
//BD
//=============
let urlDB;

if(process.env.NODE_ENV==='dev'){
	urlDB='mongodb://localhost:27017/cafe';
}else{
	urlDB='mongodb://cafe-user:1234567@ds133570.mlab.com:33570/cafe';
}

process.env.URLDB=urlDB;
