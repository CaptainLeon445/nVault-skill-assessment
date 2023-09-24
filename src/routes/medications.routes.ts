import express from "express";
import {
  createMedication,
  getAllMedications,
  getMedication,
} from "../controllers/medications.controller";
import {
  storeImageInFolder,
  uploadImage,
  validateMedicationSchema,
} from "../validation/medicationValidation";

const router = express.Router();

router.get("/", getAllMedications);
router.post(
  "/",
  validateMedicationSchema,
  uploadImage,
  storeImageInFolder,
  createMedication
);
router.get("/:medicationId", getMedication);
export default router;
