"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./logger"));
const checkBatteryLevels_1 = __importDefault(require("./scheduler/checkBatteryLevels"));
const port = parseInt(process.env.PORT, 10);
checkBatteryLevels_1.default.checkBatteryLevel();
app_1.default.listen(port, () => {
    logger_1.default.info(`Server is running on port: ${port}`);
    console.log(`Server is running on port: ${port}`);
});
