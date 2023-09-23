import { Request, Response } from "express";
import MedicationService from "../services/medication.service";

export const createMedication = async (req: Request, res: Response) => {
  try {
    const { name, weight, code, image } = req.body;
    const data = await MedicationService.createMedication(
      name,
      weight,
      code,
      image
    );
    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const getMedication = async (req: Request, res: Response) => {
  try {
    const { medicationId } = req.params;
    const data = await MedicationService.getMedication(medicationId);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const getAllMedications = async (req: Request, res: Response) => {
  try {
    const data = await MedicationService.getAllMedications();
    res.status(200).json({
      message: "Success",
      results: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};
