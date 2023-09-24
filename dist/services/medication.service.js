"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const AppError_1 = require("../middleware/AppError");
const medication_models_1 = __importDefault(require("../models/medication.models"));
class MedicationService {
    static async createMedication(name, weight, code, image) {
        // Check if the 'code' is already used in the database
        const existingMedication = await medication_models_1.default.findOne({
            where: { code: code },
        });
        if (existingMedication) {
            logger_1.default.error("Medication code is not Found");
            throw new AppError_1.AppError("Code is not unique", 404);
        }
        else {
            const medication = await medication_models_1.default.create({
                name,
                weight,
                code,
                image,
            });
            return medication;
        }
    }
    static async getMedication(medicationId) {
        const medication = await medication_models_1.default.findOne({
            where: { id: medicationId },
        });
        if (!medication) {
            logger_1.default.error("Medication not Found");
            throw new AppError_1.AppError("Medication not Found", 404);
        }
        return medication;
    }
    static async getAllMedications() {
        const medications = await medication_models_1.default.findAll();
        return medications;
    }
}
exports.default = MedicationService;
