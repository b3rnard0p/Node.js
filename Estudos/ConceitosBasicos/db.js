const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('projeto_crud', 'root', 'laboratorio', {
    host: '127.0.0.1',
    dialect: 'mysql'
});
module.exports = sequelize;