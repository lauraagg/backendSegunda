//const ruta = require("express").Router();
const { Router } = require("express");
const ruta = Router();

const consulta = require("../config/conexionbd");

ruta.post("/usuario/registrarUsuario", (req, res) => {
  const { nombre, password, correo, telefono, direccion } = req.body;
  let query =
    "INSERT INTO `appcarrito`.`usuario` (`nombre`, `id_rol`, `password`, `correo`,`telefono`, `direccion`)  VALUES ('" +
    nombre +
    "', 2, '" +
    password +
    "', '" +
    correo +
    "', '" +
    telefono +
    "', '" +
    direccion +
    "');";
  consulta.query(query, (error, rows) => {
    if (!error) res.json("Usuario Creado");
    else console.log(error);
  });
});

ruta.post("/usuario/borrar", (req, res) => {
  const { id } = req.body;
  let query = "DELETE  FROM `appcarrito`.`usuario`  WHERE id_usuario = ?";
  consulta.query(query, [id], (error, rows) => {
    if (!error) {
      res.json("Eliminado");
    } else {
      console.log(error);
    }
  });
});

ruta.post("/usuario/recuperar", (req, res) => {
  const { correo } = req.body;
  let query =
    "SELECT password FROM `appcarrito`.`usuario` WHERE correo = '" +
    correo +
    "'";
  consulta.query(query, (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

ruta.post("/usuario/getUsuario", (req, res) => {
  const { id_usuario } = req.body;
  let query =
    "SELECT id_usuario,nombre,correo,telefono,direccion,id_rol FROM `appcarrito`.`usuario` WHERE id_usuario = " +
    id_usuario +
    "";
  consulta.query(query, (err, rows) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

ruta.post("/login", (req, res) => {
  const { correo, password } = req.body;
  let pass = "";
  let query =
    "SELECT * FROM `appcarrito`.`usuario` WHERE correo = '" + correo + "'";
  consulta.query(query, (err, resp) => {
    if (!err) {
      pass = resp[0].password;
      console.log(password);
      console.log(pass);
      if (password == pass) {
        console.log("se cumple");
        console.log(pass);
        res.json(resp[0]);
      } else {
        res.json(err);
      }
    } else {
      console.log(err);
    }
  });
});

ruta.post("/usuario/update", (req, res) => {
  const { id_usuario, nombre, correo, telefono, direccion } = req.body;
  let query =
    "UPDATE `appcarrito`.`usuario` SET `nombre` = '" +
    nombre +
    "', `correo` = '" +
    correo +
    "', `telefono` = '" +
    telefono +
    "', `direccion` = '" +
    direccion +
    "' WHERE (`id_usuario` = '" +
    id_usuario +
    "')";
  consulta.query(query, (err, rows) => {
    if (!err) {
      res.json("Datos actualizados");
    } else {
      res.json(err);
    }
  });
});

module.exports = ruta;
