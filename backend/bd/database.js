const { Sequelize } = require("sequelize");
const config = require("./config.json").development; 

const sequelize = new Sequelize(
  config.database, // Nombre de la base de datos
  config.username, // Usuario de PostgreSQL
  config.password, // Contraseña de PostgreSQL
  {
    host: config.host, 
    dialect: "postgres",
    logging: false, 
  }
);

module.exports = sequelize;