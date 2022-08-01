
const mysql = require("mysql");
const conecta = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    port:"3306",
    database:"appcarrito"
});
conecta.connect();
module.exports = conecta;