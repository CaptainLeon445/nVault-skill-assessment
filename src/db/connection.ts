import { Sequelize } from "sequelize";
import logger from "../logger";

const dbConfig = {
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
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
    logger.info("Unable to connect to the database");
    console.error("Unable to connect to the database", err.message);
  });

export default sequelize;
