import { Sequelize } from "sequelize";

const dbConfig = {
  database: "db_name",
  username: "db_username",
  password: "db_password",
  host: "db_host",
  dialect: "db_type",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database");
  });

export default sequelize;
