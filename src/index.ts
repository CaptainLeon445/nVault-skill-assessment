import express, {Application, Request, Response } from "express";

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express and Typescript server with Leon. Ok43");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


