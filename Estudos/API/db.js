const mysql = require('mysql2');
const db = mysql.createPool({
 host: '127.0.0.1',
 user: 'root',
 password: 'laboratorio',
 database: 'api_tarefas'
});
module.exports = db;
