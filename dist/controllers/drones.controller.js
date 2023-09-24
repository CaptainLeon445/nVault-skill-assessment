"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBatteryLevels = exports.getAllDrones = exports.checkDroneBattery = exports.checkAvailableDrones = exports.checkLoadMedications = exports.loadDrone = exports.registerDrone = void 0;
const drone_service_1 = __importDefault(require("../services/drone.service"));
const logger_1 = __importDefault(require("../logger"));
const registerDrone = async (req, res, next) => {
    try {
        const { serialNumber, model, weightLimit, batteryCapacity } = req.body;
        const data = await drone_service_1.default.registerDrone(serialNumber, model, weightLimit, batteryCapacity);
        res.status(201).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.registerDrone = registerDrone;
const loadDrone = async (req, res, next) => {
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
        logger_1.default.error(error);
        next(new Error(error));
    }
};
exports.loadDrone = loadDrone;
const checkLoadMedications = async (req, res, next) => {
    try {
        const { serialNumber } = req.params;
        const data = await drone_service_1.default.checkLoadedMedications(serialNumber);
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.checkLoadMedications = checkLoadMedications;
const checkAvailableDrones = async (req, res, next) => {
    try {
        const data = await drone_service_1.default.checkAvailableDrones();
        res.status(200).json({
            message: "Success",
            results: data.length,
            data,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.checkAvailableDrones = checkAvailableDrones;
const checkDroneBattery = async (req, res, next) => {
    try {
        const { serialNumber } = req.params;
        const droneBattery = await drone_service_1.default.checkDroneBattery(serialNumber);
        res.status(200).json({
            message: "Success",
            data: droneBattery,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.checkDroneBattery = checkDroneBattery;
const getAllDrones = async (req, res, next) => {
    try {
        const data = await drone_service_1.default.getAllDrones();
        res.status(200).json({
            message: "success",
            results: data.length,
            data,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.getAllDrones = getAllDrones;
const checkBatteryLevels = async (req, res, next) => {
    try {
        const data = await drone_service_1.default.checkDroneBatteryLevels();
        return data;
    }
    catch (error) {
        logger_1.default.error("Error in checking battery levels");
        next(error);
    }
};
exports.checkBatteryLevels = checkBatteryLevels;
