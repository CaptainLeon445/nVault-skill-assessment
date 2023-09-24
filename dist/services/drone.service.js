"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drone_models_1 = __importDefault(require("../models/drone.models"));
const droneMedication_model_1 = __importDefault(require("../models/droneMedication.model"));
const medication_models_1 = __importDefault(require("../models/medication.models"));
const logger_1 = __importDefault(require("../logger"));
class DroneService {
    static async registerDrone(serialNumber, model, weightLimit, batteryCapacity) {
        const drone = await drone_models_1.default.create({
            serialNumber,
            model,
            weightLimit,
            batteryCapacity,
            state: "IDLE",
        });
        return drone;
    }
    static async loadDrone(serialNumber, medicationId, batteryLevel) {
        const drone = await drone_models_1.default.findOne({
            where: { serialNumber },
        });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new Error("Drone not found");
        }
        else if (drone.state !== "IDLE") {
            logger_1.default.error("Drone is not in IDLE state");
            throw new Error("Drone is not in IDLE state");
        }
        else if (drone.batteryCapacity < batteryLevel) {
            logger_1.default.error("Drone cannot be loaded");
            throw new Error("Drone cannot be loaded");
        }
        else {
            console.log("checking", medicationId);
            const medication = await medication_models_1.default.findOne({
                where: { id: medicationId },
            });
            if (!medication) {
                logger_1.default.error("Medication not Found");
                return new Error("Medication not Found");
            }
            else if (medication.weight > drone.weightLimit) {
                logger_1.default.error("Medication too heavy for this drone");
                throw new Error("Medication too heavy for this drone");
            }
            else {
                await droneMedication_model_1.default.create({
                    droneId: drone.id,
                    medicationId: medication.id,
                });
                drone.state = "LOADED";
                await drone.save();
                return drone;
            }
        }
    }
    static async checkLoadedMedications(serialNumber) {
        const drone = await drone_models_1.default.findOne({
            where: { serialNumber },
        });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new Error("Drone not found");
        }
        else {
            return drone;
        }
    }
    static async checkAvailableDrones() {
        const AvailableDrones = await drone_models_1.default.findAll({ where: { state: "IDLE" } });
        return AvailableDrones;
    }
    static async checkDroneBattery(serialNumber) {
        const drone = await drone_models_1.default.findOne({ where: { serialNumber } });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new Error("Drone not found");
        }
        return drone.batteryCapacity;
    }
}
exports.default = DroneService;
