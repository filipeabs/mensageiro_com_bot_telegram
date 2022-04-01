const mysql = require("mysql");

const conexao = mysql.createConnection({
  host: process.env.HOST_MYSQL,
  port: process.env.PORT_MYSQL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = conexao;
