import express, { Application, Request, Response } from "express";
import droneRoutes from "./routes/drones.routes";
import medicationRoutes from "./routes/medications.routes";

const app: Application = express();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express and Typescript server with Leon. Ok43");
});
app.use("/drones", droneRoutes);
app.use("/medications", medicationRoutes);

export default app;
