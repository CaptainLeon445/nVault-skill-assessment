import { NextFunction, Request, Response } from "express";
import MedicationService from "../services/medication.service";
import logger from "../logger";

export const createMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    logger.error(error);
    next(error);
  }
};

export const getMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const medicationId: number = parseInt(req.params.medicationId, 10);
    const data = await MedicationService.getMedication(medicationId);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getAllMedications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await MedicationService.getAllMedications();
    res.status(200).json({
      message: "Success",
      results: data.length,
      data,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
