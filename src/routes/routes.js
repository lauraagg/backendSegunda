// desde express requiero su metodo llamdo router
const { Router } = require('express');
const ruta = Router();

//Entamos al archivo database y trae la cadena de conexion
//IMPORTANTE
const consulta = require('../database');

ruta.get('/', (req, res) => {
    res.json({ "Title": "Hello World" });
});

//Aqui se importa el modulo de database
//creamos la ruta inicial para obtener los datos
//usuario
ruta.get('/h', (req, res) => {
    consulta.query('SELECT * FROM usuario', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

ruta.post('/eoo', (req, res) => {
    console.log(req, body);
    res.send('recibido');
});


//REGISTRO
//   DE
//USUARIOS
ruta.post('/usuario/registrar', (req, res) => {
    const { nombre, id_rol, password, correo } = req.body;
    let sql = "INSERT INTO `appcarrito`.`usuario` ( `nombre`, `id_rol`, `password`, `correo`) VALUES('" + nombre + "', '" + id_rol + "', '" + password + "', '" + correo + "')";
    consulta.query(sql, (err, rows) => {
        if (!err) {
            res.json('registro incertado');
        } else {
            console.log(err);
        }

    })
});



//RECUPERAR
//CONTRASEÑA
ruta.post('/usuario/recuperar', (req, res) => {
    const { correo } = req.body;
    let sql = "SELECT password FROM `appcarrito`.`usuario` WHERE correo = '" + correo + "'";
    consulta.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
});


//Eliminar datos
ruta.delete('/usuario/eliminar/:id', (req, res) => {
    const { id } = req.params;
    let sql = "DELETE FROM `appcarrito`.`usuario` WHERE id_usuario = ?";
    consulta.query(sql, [id], (error, rows) => {
        if (!error) {
            res.json('Eliminado');
        } else {
            console.log(error);
        }
    })
});



// ------------------------------------------LISTO
//CARRITO APP
//Productos 
ruta.get('/muestra/productos/:id', (req, res) => {
    const { id } = req.params;
    let sql = "SELECT nombre_producto, precio_producto, productos.desc  FROM productos LEFT join venta on venta.id_producto = productos.id WHERE productos.id >= ?";
    consulta.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});


//  CONSULTAR TICKET
//http://localhost:4200/ticket/consulta/1
ruta.get('/ticket/consulta/:id', (req, res) => {
    const { id } = req.params;
    //let sql = "SELECT venta.id_venta, venta.id_ticket, venta.cantidad, nombre_producto, categoria_producto, precio_producto, descripbr_producto, imagen FROM venta INNER JOIN productos ON venta.id_producto = productos.id -- tabla.FK = tabla.PK INNER JOIN ticket ON venta.id_ticket = ticket.id_ticket;";
    let sql = "SELECT venta.id_venta, usuario.nombre, venta.id_ticket, venta.cantidad, nombre_producto, precio_producto, productos.desc, imagen FROM venta INNER JOIN productos ON venta.id_producto = productos.id INNER JOIN ticket ON venta.id_ticket = ticket.id_ticket INNER JOIN usuario ON ticket.id_usuario =usuario.id_usuario WHERE ticket.id_ticket = ?";
    consulta.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});

//ELIMINAR
//DELETE FROM `appcarrito`.`venta` WHERE id_venta = 9;
//elimina venta, no ticket
ruta.delete('/ticket/eliminar/:id', (req, res) => {
    const { id } = req.params;
    let sql = "DELETE FROM `appcarrito`.`venta` WHERE id_venta = ?";
    consulta.query(sql, [id], (error, rows) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    })
});

// -------------------------------

//INSERTAR PRODUCTO EN TICKET
//  NOTA: colocar mismas variables que en postman
//http://localhost:4200/ticket/insertar
ruta.post('/ticket/insertar', (req, res) => {
    const { id_ticket, id_producto, cantidad } = req.body;
    let sql = "call insertar_en_ticket('" + id_ticket + "', '" + id_producto + "', '" + cantidad + "')";
    consulta.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});


//Genera ticket
//INSERT INTO `appcarrito`.`ticket` (`id_ticket`) VALUES ('6');
ruta.post('/generaticket', (req, res) => {
    const { id } = req.body;
    let sql = "INSERT INTO `appcarrito`.`ticket` (`id_usuario`) VALUES ('" + id + "')";
    consulta.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows.insert.id);
        } else {
            console.log(err);
        }

    })
});



//    Ahora Obtiene id producto
//SELECT productos.id FROM productos WHERE nombre_producto = 'tv';
ruta.post('/obtenid', (req, res) => {
    const { nombre_producto } = req.body;
    let sql = "SELECT productos.id FROM productos WHERE nombre_producto = '" + nombre_producto + "'";
    consulta.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});



//TOTAL
ruta.get('/ticket/total/:id', (req, res) => {
    const { id } = req.params;
    //let sql = "SELECT venta.id_venta, venta.id_ticket, venta.cantidad, nombre_producto, categoria_producto, precio_producto, descripbr_producto, imagen FROM venta INNER JOIN productos ON venta.id_producto = productos.id -- tabla.FK = tabla.PK INNER JOIN ticket ON venta.id_ticket = ticket.id_ticket;";
    let sql = "SELECT  sum(venta.cantidad) as total FROM venta INNER JOIN productos ON venta.id_producto = productos.id INNER JOIN ticket  ON venta.id_ticket = ticket.id_ticket INNER JOIN usuario ON ticket.id_usuario =usuario.id_usuario WHERE ticket.id_ticket = ?";
    consulta.query(sql, [id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});








//MODIFICAR CANTIDAD
ruta.post('/ticket/modificacant', (req, res) => {
    const { id_venta, cantidad } = req.body;
    let sql = "call modificar_cant('" + id_venta + "', '" + cantidad + "')";
    consulta.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }

    })
});



module.exports = router;