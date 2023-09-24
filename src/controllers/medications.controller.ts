import { NextFunction, Request, Response } from "express";
import MedicationService from "../services/medication.service";
import logger from "../logger";

export const createMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, weight, code} = req.body;
    const data = await MedicationService.createMedication(
      name,
      weight,
      code
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

export const addImageToMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.medicationId = parseInt(req.params.medicationId, 10)
    const { image, medicationId} = req.body;
    const data = await MedicationService.addImageToMedication(
      image,
      medicationId
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
