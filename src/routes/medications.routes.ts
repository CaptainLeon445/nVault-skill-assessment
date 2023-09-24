import express from "express";
import {
  addImageToMedication,
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
  createMedication
)
router.patch(
  "/:medicationId/addImage",
  uploadImage,
  storeImageInFolder,
  addImageToMedication
);
router.get("/:medicationId", getMedication);
export default router;
