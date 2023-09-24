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
    static async loadDrone(serialNumber, medicationId) {
        const drone = await drone_models_1.default.findOne({
            where: { serialNumber },
        });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new AppError("Drone not found", 404);
        }
        else if (drone.state !== "IDLE") {
            logger_1.default.error("Drone is not in IDLE state");
            throw new AppError("Drone is not in IDLE state", 404);
        }
        else if (drone.batteryCapacity < 25) {
            logger_1.default.error("Drone cannot be loaded");
            throw new AppError("Drone cannot be loaded", 404);
        }
        else {
            const medication = await medication_models_1.default.findOne({
                where: { id: medicationId },
            });
            if (!medication) {
                logger_1.default.error("Medication not Found");
                return new AppError("Medication not Found", 404);
            }
            else if (medication.weight > drone.weightLimit) {
                logger_1.default.error("Medication load is too heavy for this drone");
                throw new AppError("Medication load is too heavy for this drone", 404);
            }
            else {
                await droneMedication_model_1.default.create({
                    droneId: drone.id,
                    medicationId: medication.id,
                });
                drone.state = "LOADED";
                const obj = await drone.save();
                const data = {
                    drone: {
                        ...obj.dataValues,
                        load: {
                            weight: medication.weight,
                            name: medication.name,
                            code: medication.code,
                            image: medication.image,
                        },
                    },
                };
                return data;
            }
        }
    }
    static async checkLoadedMedications(serialNumber) {
        const drone = await drone_models_1.default.findOne({
            where: { serialNumber },
        });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new AppError("Drone not found", 404);
        }
        else {
            const loaded = await droneMedication_model_1.default.findOne({
                where: { droneId: drone.id },
            });
            const loadedMedication = await medication_models_1.default.findOne({
                where: { id: loaded.medicationId },
            });
            const data = {
                drone: {
                    ...drone.dataValues,
                    load: {
                        weight: loadedMedication.weight,
                        name: loadedMedication.name,
                        code: loadedMedication.code,
                        image: loadedMedication.image,
                    },
                },
            };
            return data;
        }
    }
    static async checkAvailableDrones() {
        const AvailableDrones = await drone_models_1.default.findAll({ where: { state: "IDLE" } });
        return AvailableDrones;
    }
    static async getAllDrones() {
        const allDrones = await drone_models_1.default.findAll();
        return allDrones;
    }
    static async checkDroneBattery(serialNumber) {
        const drone = await drone_models_1.default.findOne({ where: { serialNumber } });
        if (!drone) {
            logger_1.default.error("Drone not found");
            throw new AppError("Drone not found", 404);
        }
        return drone.batteryCapacity;
    }
    static async checkDroneBatteryLevels() {
        const drones = await this.getAllDrones();
        const batteryLevels = {};
        drones.forEach((drone) => {
            batteryLevels[drone.serialNumber] = drone.batteryCapacity;
        });
        return batteryLevels;
    }
}
exports.default = DroneService;
