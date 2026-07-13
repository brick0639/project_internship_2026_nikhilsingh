const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:quofYnbeanjxxtgVyyNmcoSkpWwVdpcE@hayabusa.proxy.rlwy.net:54176/railway",
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