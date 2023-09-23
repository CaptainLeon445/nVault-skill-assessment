"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drone_models_1 = __importDefault(require("../models/drone.models"));
const droneMedication_model_1 = __importDefault(require("../models/droneMedication.model"));
const medication_models_1 = __importDefault(require("../models/medication.models"));
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
    static async loadDrone(serialNumber, medicationWeight, batteryLevel, medicationId) {
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
            if (drone.batteryCapacity < batteryLevel) {
                throw new Error("Drone cannot be loaded");
            }
            const medication = await medication_models_1.default.findByPk(medicationId);
            if (!medication) {
                throw new Error('Medication not Found');
            }
            if (medication.weight > drone.weightLimit) {
                throw new Error('Medication too heavy for this drone');
            }
            await droneMedication_model_1.default.create({
                droneId: drone.id,
                medicationId: medication.id
            });
            drone.state = 'LOADED';
            await drone.save();
            return drone;
        }
        catch (error) {
            throw new Error("Error loading this Drone");
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
    static async checkAvailableDrones() {
        try {
            const AvailableDrones = await drone_models_1.default.findAll({ where: { state: 'IDLE' } });
            return AvailableDrones;
        }
        catch (error) {
            throw new Error('Error checking available drones: ');
        }
    }
    static async checkDroneBattery(serialNumber) {
        try {
            const drone = await drone_models_1.default.findOne({ where: { serialNumber } });
            if (!drone) {
                throw new Error('Drone not found');
            }
            return drone.batteryCapacity;
        }
        catch (error) {
            throw new Error('Error checking drone battery level: ');
        }
    }
}
exports.default = DroneService;
