const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: process.env.HOST_MYSQL_AC,
  port: process.env.PORT_MYSQL_AC,
  user: process.env.MYSQL_USER_AC,
  password: process.env.MYSQL_PASSWORD_AC,
  database: process.env.MYSQL_DATABASE_AC, 
});

module.exports = conexao;