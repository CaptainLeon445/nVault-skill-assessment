import express from "express";
import {
  checkAvailableDrones,
  checkDroneBattery,
  checkLoadMedications,
  loadDrone,
  registerDrone,
} from "../controllers/drones.controller";
import { validateDroneRegistration } from "../validation/valiadtion";

const router = express.Router();

router.post("/", validateDroneRegistration, registerDrone);
router.post("/:serialNumber/load", loadDrone);
router.get("/:serialNumber/medications", checkLoadMedications);
router.get("/available", checkAvailableDrones);
router.get("/:serialNumber/battery", checkDroneBattery);

export default router;
