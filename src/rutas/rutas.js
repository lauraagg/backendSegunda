
//const ruta = require("express").Router();
const {Router} = require('express');
const ruta = Router();

const consulta = require('../config/conexionbd');

ruta.post("/usuario/registrar", (req, res) => {
  const {nombre,id_rol,password,correo} = req.body;
  let query = "INSERT INTO `appcarrito`.`usuario` (`nombre`, `id_rol`, `password`, `correo`)  VALUES ('"+nombre+"', '"+id_rol+"', '"+password+"', '"+correo+"');";
  consulta.query(query,(error,rows)=>{
    if(!error) res.json("Usuario Creado");
    else
    console.log(error);
  })
});

ruta.post("/usuario/borrar", (req, res) => {
  const {id} = req.body;
  let query = "DELETE  FROM `appcarrito`.`usuario`  WHERE id_usuario = ?";
  consulta.query(query,[id],(error,rows)=>{
    if(!error){
      res.json('Eliminado');
    }
    else{
  console.log(error);
    }
  })
  });

ruta.post('/usuario/recuperar',(req,res)=>{
  const {correo} = req.body;
  let query ="SELECT password FROM `appcarrito`.`usuario` WHERE correo = "+correo+"";
  consulta.query(query,(err,rows)=>{
    if(!err){
      res.json(rows);
    }
    else{
  console.log(err);
    }
    
   })
});

ruta.get('/bd',(req,res)=>{
 let query = "SELECT user.nombre,rol.descripcion from user_rol INNER JOIN rol,user where user_rol.iduser_rol = user_rol.id_user = user.id_user";
 consulta.query(query,(err,rows)=>{
  if(!err){
    res.json(rows);
  }
  else{
console.log(err);
  }
  
 })
});
ruta.get('/bd/:id', (req,res)=>{
const {id} = req.params;
let query = "Select * FROM USER  WHERE id_user = ?";
consulta.query(query,[id],(error,rows)=>{
  if(!error){
    res.json(rows);
  }
  else{
console.log(err);
  }
})
});

ruta.delete('/delete/:id', (req,res)=>{
  const {id} = req.params;
  let query = "DELETE  FROM USER  WHERE id_user = ?";
  consulta.query(query,[id],(error,rows)=>{
    if(!error){
      res.json('Eliminado');
    }
    else{
  console.log(error);
    }
  })
  });

  ruta.post('/bd/inserta',(req,res)=>{
    const {id_rol,descripcion} = req.body;
    console.log(id_rol);
    console.log(descripcion);
    console.log(req.body);
    
    let query = "INSERT INTO `proyecto`.`rol` (`id_rol`, `descripcion`) VALUES ('"+id_rol+"', '"+descripcion+"');";
    consulta.query(query,(error,rows)=>{
      if(!error) res.json("Creado");
      else
      console.log(error);
    })
  });

  ruta.put('/bd/actualiza/',(req,res)=>{
    const {descripcion,id_rol} = req.body;
    
    
    let query = "UPDATE `proyecto`.`rol` SET `descripcion` = '"+descripcion+"' WHERE (`id_rol` = '"+id_rol+"');";
    consulta.query(query,(error,rows)=>{
      if(!error) res.json("Campo actualizado");
      else
      console.log(error);
    })
  })



module.exports = ruta;
