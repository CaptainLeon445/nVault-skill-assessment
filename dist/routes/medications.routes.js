"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drones_controller_1 = require("../controllers/drones.controller");
const router = express_1.default.Router();
router.post("/", drones_controller_1.registerDrone);
router.post("/:serialNumber/load", drones_controller_1.loadDrone);
router.get("/:serialNumber/medications", drones_controller_1.checkLoadMedications);
router.get("/available", drones_controller_1.checkAvailableDrones);
router.get("/:serialNumber/battery", drones_controller_1.checkDroneBattery);
exports.default = router;
