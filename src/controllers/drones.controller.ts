import { NextFunction, Request, Response } from "express";
import DroneService from "../services/drone.service";
import { validateRegisterDrone } from "../validation/valiadtion";

export const registerDrone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { error } = validateRegisterDrone(body);
    if (error) {
      return res.status(400).json({
        error: {
          message: error.details[0].message,
        },
      });
    }
    const { serialNumber, model, weightLimit, batteryCapacity } = req.body;
    const data = await DroneService.registerDrone(
      serialNumber,
      model,
      weightLimit,
      batteryCapacity
    );
    res.status(201).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const loadDrone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.serialNumber = req.params.serialNumber;
    const { serialNumber, medicationId, batteryLevel } = req.body;
    const data = await DroneService.loadDrone(
      serialNumber,
      medicationId,
      batteryLevel
    );
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const checkLoadMedications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serialNumber } = req.params;
    const data = await DroneService.checkLoadedMedications(serialNumber);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const checkAvailableDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await DroneService.checkAvailableDrones();
    res.status(200).json({
      message: "Success",
      results: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const checkDroneBattery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serialNumber } = req.params;
    const data = await DroneService.checkDroneBattery(serialNumber);
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
