"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDroneBattery = exports.checkAvailableDrones = exports.checkLoadMedications = exports.loadDrone = exports.registerDrone = void 0;
const drone_service_1 = __importDefault(require("../services/drone.service"));
const registerDrone = async (req, res) => {
    try {
        const { serialNumber, model, weightLimit, batteryCapacity } = req.body;
        const data = await drone_service_1.default.registerDrone(serialNumber, model, weightLimit, batteryCapacity);
        res.status(201).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
};
exports.registerDrone = registerDrone;
const loadDrone = async (req, res) => {
    try {
        req.body.serialNumber = req.params.serialNumber;
        const { serialNumber, medicationId, batteryLevel } = req.body;
        const data = await drone_service_1.default.loadDrone(serialNumber, medicationId, batteryLevel);
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
};
exports.loadDrone = loadDrone;
const checkLoadMedications = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const data = await drone_service_1.default.checkLoadedMedications(serialNumber);
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
};
exports.checkLoadMedications = checkLoadMedications;
const checkAvailableDrones = async (req, res) => {
    try {
        const data = await drone_service_1.default.checkAvailableDrones();
        res.status(200).json({
            message: "Success",
            results: data.length,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
};
exports.checkAvailableDrones = checkAvailableDrones;
const checkDroneBattery = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const data = await drone_service_1.default.checkDroneBattery(serialNumber);
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
        });
    }
};
exports.checkDroneBattery = checkDroneBattery;
