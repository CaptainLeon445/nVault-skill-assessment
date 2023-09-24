import { Sequelize } from "sequelize";
import logger from "../logger";

const dbConfig = {
  database: "sql3648569",
  username: "sql3648569",
  password: "Ur6v3N1gje",
  host: "sql3.freesqldatabase.com",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    logging: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    logger.error("Unable to connect to the database", err);
    console.error("Unable to connect to the database", err.message);
  });

export default sequelize;
