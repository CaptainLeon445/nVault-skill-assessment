import { NextFunction, Request, Response } from "express";
import DroneService from "../services/drone.service";
import logger from "../logger";

export const registerDrone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    logger.error(error);
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
    logger.error(error);
    next(new Error(error));
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
    logger.error(error);
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
    logger.error(error);
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
    const droneBattery = await DroneService.checkDroneBattery(serialNumber);
    res.status(200).json({
      message: "Success",
      data: droneBattery,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const getAllDrones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await DroneService.getAllDrones();
    res.status(200).json({
      message: "success",
      results: data.length,
      data,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const checkBatteryLevels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await DroneService.checkDroneBatteryLevels();
    return data;
  } catch (error) {
    logger.error("Error in checking battery levels");
    next(error);
  }
};
