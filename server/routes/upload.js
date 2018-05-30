const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs=require('fs');
const path=require('path');

const Usuario=require('../models/usuario');
const Producto=require('../models/producto');

 
// default options
app.use(fileUpload());
 
app.put('/upload/:tipo/:id', function(req, res) {

let tipo=req.params.tipo;
let id=req.params.id;

  if (!req.files){
    return res.status(400)
          json({
            ok:false,
            err:{
              message:'No se ha seleccionado ningún archivo'
            }
          });
  }
 
//validar tipo
let tiposValidos=['productos','usuarios'];

if(tiposValidos.indexOf(tipo)<0){
  return res.status(404).json({
    ok:false,
    err:{
        message:'Los tipos permitidas son ' + tiposValidos.join(', ')
        
    }
  })

}



  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let archivo = req.files.archivo;
  let nombreCortado=archivo.name.split('.');
  let extension=nombreCortado[nombreCortado.length-1];
//extensiones permitidas
let extensionesValidas=['png','jpeg','jpg','gif'];



if(extensionesValidas.indexOf(extension)<0){

  return res.status(400).json({
      ok:false,
      err:{
        message:'Las extensiones permitidas son ' + extensionesValidas.join(', '),
        ext:extension
      }
  })

}


//cambiar nombre del archivo
//18937418fdfdb-123.jpg
let nombreArchivo=`${id}-${new Date().getMilliseconds()}.${extension}`;




  // Use the mv() method to place the file somewhere on your server
  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) =>{
    if (err)
      return res.status(500).json({
        ok:false,
        err
      });
 //aqui, la imagen se cargo

 if(tipo==='usuarios'){
    imagenUsuario(id,res,nombreArchivo);

 }else{
    imagenProducto(id,res,nombreArchivo);
  }
 

  });
});

function imagenUsuario(id, res,nombreArchivo){

  Usuario.findById(id,(err,usuarioDB)=>{
      if(err){
        borrarArchivo(nombreArchivo, 'usuarios');
          return res.status(500).json({
            ok:false,
            err
          });
      }

      if(!usuarioDB){
        borrarArchivo(nombreArchivo, 'usuarios');
        return res.status(400).json({
            ok:false,
            err:{
              message:'Usuario no existe'
            }
          });
      }

      borrarArchivo(usuarioDB.img, 'usuarios');

      usuarioDB.img=nombreArchivo;

      usuarioDB.save((err,usuarioGuardado)=>{
        res.json({
          ok:true,
          usuario:usuarioGuardado,
          img:nombreArchivo
        })
      })
   });
  }


function imagenProducto(id, res,nombreArchivo){

  Producto.findById(id,(err,productoDB)=>{
      if(err){
        borrarArchivo(nombreArchivo, 'productos');
          return res.status(500).json({
            ok:false,
            err
          });
      }

      if(!productoDB){
        borrarArchivo(nombreArchivo, 'productos');
        return res.status(400).json({
            ok:false,
            err:{
              message:'Producto no existe'
            }
          });
      }

      borrarArchivo(productoDB.img, 'productos');

      productoDB.img=nombreArchivo;

      productoDB.save((err,productoGuardado)=>{
        res.json({
          ok:true,
          producto:productoGuardado,
          img:nombreArchivo
        })
      })
   });
  }





function borrarArchivo(nombreImagen, tipo){

   let pathImagen=path.resolve(__dirname,`../../uploads/${tipo}/${nombreImagen}`);

      if(fs.existsSync(pathImagen)){

        fs.unlinkSync(pathImagen);

      }

}


module.exports=app;