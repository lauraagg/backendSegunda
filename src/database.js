const mysql = require('mysql');

const mconsulta = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'appcarrito'
});

consulta.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Bd conectada');
    }
});

//Aqui tenemos el modulo y tenemos que exportarlo para utilizarlo
module.exports = consulta;