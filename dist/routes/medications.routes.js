"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medications_controller_1 = require("../controllers/medications.controller");
const router = express_1.default.Router();
router.get("/", medications_controller_1.getAllMedications);
router.post("/", medications_controller_1.createMedication);
router.post("/:medicationId", medications_controller_1.getMedication);
exports.default = router;
