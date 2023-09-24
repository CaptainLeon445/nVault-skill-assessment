"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const checkBatteryLevels_1 = __importDefault(require("./scheduler/checkBatteryLevels"));
const port = 3000;
app_1.default.listen(port, () => {
    // logger.info(`Server is running on port: ${port}`);
    console.log(`Server is running on port: ${port}`);
    checkBatteryLevels_1.default.checkBatteryLevel();
});
