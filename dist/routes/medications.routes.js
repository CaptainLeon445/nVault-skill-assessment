"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medications_controller_1 = require("../controllers/medications.controller");
const medicationValidation_1 = require("../validation/medicationValidation");
const router = express_1.default.Router();
router.get("/", medications_controller_1.getAllMedications);
router.post("/", medicationValidation_1.validateMedicationSchema, medications_controller_1.createMedication);
router.patch("/:medicationId/addImage", medicationValidation_1.uploadImage, medicationValidation_1.storeImageInFolder, medications_controller_1.addImageToMedication);
router.get("/:medicationId", medications_controller_1.getMedication);
exports.default = router;
