const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:bBaiGNhlQhmUXaEZIplrspiuZyFiWiyu@tokaido.proxy.rlwy.net:42759/railway",
  {
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;