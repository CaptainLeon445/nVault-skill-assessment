import app from "./app";
import logger from "./logger";
const port: number = process.env.PORT;
app.listen(port, () => {
  logger.info(`Server is running on port: ${port}`)
  console.log(`Server is running on port: ${port}`);
});
