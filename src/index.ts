import app from "./app";
import logger from "./logger";
import Job from "./scheduler/checkBatteryLevels";

const port = 3000;

app.listen(port, () => {
  // logger.info(`Server is running on port: ${port}`);
  console.log(`Server is running on port: ${port}`);
  Job.checkBatteryLevel();
});
