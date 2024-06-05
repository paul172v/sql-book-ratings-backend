import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "root", process.env.DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
