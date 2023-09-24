import app from "./app";
import logger from "./logger";
import Job from "./scheduler/checkBatteryLevels";

const port: number = parseInt(process.env.PORT, 10);
Job.checkBatteryLevel();

app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
  console.log(`Server is running on port: ${port}`);
});
