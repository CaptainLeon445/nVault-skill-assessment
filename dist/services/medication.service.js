"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const medication_models_1 = __importDefault(require("../models/medication.models"));
class MedicationService {
    static async createMedication(name, weight, code, image) {
        try {
            const medication = await medication_models_1.default.create({
                name,
                weight,
                code,
                image,
            });
            return medication;
        }
        catch (error) {
            throw new Error("Error creating medication");
        }
    }
}
exports.default = MedicationService;
