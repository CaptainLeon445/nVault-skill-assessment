"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMedications = exports.getMedication = exports.createMedication = void 0;
const medication_service_1 = __importDefault(require("../services/medication.service"));
const createMedication = async (req, res) => {
    try {
        const { name, weight, code, image } = req.body;
        const data = await medication_service_1.default.createMedication(name, weight, code, image);
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
exports.createMedication = createMedication;
const getMedication = async (req, res) => {
    try {
        const { medicationId } = req.params;
        const data = await medication_service_1.default.getMedication(medicationId);
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
exports.getMedication = getMedication;
const getAllMedications = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const data = await medication_service_1.default.getAllMedications();
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
exports.getAllMedications = getAllMedications;
