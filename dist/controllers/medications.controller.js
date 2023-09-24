"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMedications = exports.getMedication = exports.createMedication = void 0;
const medication_service_1 = __importDefault(require("../services/medication.service"));
const logger_1 = __importDefault(require("../logger"));
const createMedication = async (req, res, next) => {
    try {
        const { name, weight, code, image } = req.body;
        const data = await medication_service_1.default.createMedication(name, weight, code, image);
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
exports.createMedication = createMedication;
const getMedication = async (req, res, next) => {
    try {
        const medicationId = parseInt(req.params.medicationId, 10);
        const data = await medication_service_1.default.getMedication(medicationId);
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
exports.getMedication = getMedication;
const getAllMedications = async (req, res, next) => {
    try {
        const data = await medication_service_1.default.getAllMedications();
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
exports.getAllMedications = getAllMedications;
