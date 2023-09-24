import express from "express";
import {
  createMedication,
  getAllMedications,
  getMedication,
} from "../controllers/medications.controller";

const router = express.Router();

router.get("/", getAllMedications);
router.post("/", createMedication);
router.get("/:medicationId", getMedication);
export default router;
