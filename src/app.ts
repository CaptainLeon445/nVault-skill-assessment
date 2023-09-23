import express, { Application, NextFunction, Request, Response } from "express";
import droneRoutes from "./routes/drones.routes";
import medicationRoutes from "./routes/medications.routes";
import { globalErrorHandler } from "./middleware/error.middleware";
import logger from "./logger";
import sequelize from "./db/connection";

const app: Application = express();

app.use(express.json());
async ()=> {
  try{
    await sequelize.sync({ alter: true})
    console.log("Models Scynchronized with the database")
  }catch(error){
    logger.info(error)
    console.error("Error synchronizing models")
  }finally{
    sequelize.close()
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express and Typescript server with Leon. Ok43");
});
app.use("/drones", droneRoutes);
app.use("/medications", medicationRoutes);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Can't find ${req.originalUrl} on this server!`);
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  res.status(404).json({
    error: {
      message: error.message,
    },
  });
});

app.use(globalErrorHandler);

export default app;
