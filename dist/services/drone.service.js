"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drone_models_1 = __importDefault(require("../models/drone.models"));
class DroneService {
    static async registerDrone(serialNumber, model, weightLimit, batteryCapacity) {
        try {
            const drone = await drone_models_1.default.create({
                serialNumber,
                model,
                weightLimit,
                batteryCapacity,
                state: "IDLE",
            });
            return drone;
        }
        catch (error) {
            throw new Error("Error Registering Drone");
        }
    }
    static async loadDrone(serialNumber, medicationWeight, batteryLevel) {
        try {
            const drone = await drone_models_1.default.findOne({
                where: { serialNumber }
            });
            if (!drone) {
                throw new Error("Drone not found");
            }
            if (drone.state !== 'IDLE') {
                throw new Error("Drone is not in IDLE state");
            }
            if (drone.batteryCapacity < batteryLevel || drone.weightLimit < medicationWeight) {
                throw new Error("Drone cannot be loaded");
            }
            return drone;
        }
        catch (error) {
            throw new Error("Error Registering Drone");
        }
    }
    static async checkLoadedMedications(serialNumber) {
        try {
            const drone = await drone_models_1.default.findOne({
                where: { serialNumber }
            });
            if (!drone) {
                throw new Error("Drone not found");
            }
            return drone;
        }
        catch (error) {
            throw new Error("Error Registering Drone");
        }
    }
}
exports.default = DroneService;
