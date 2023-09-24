import Drone from "../models/drone.models";
import DroneMedication from "../models/droneMedication.model";
import Medication from "../models/medication.models";
import logger from "../logger";
import { NextFunction } from "express";
export default class DroneService {
  static async registerDrone(
    serialNumber: string,
    model: string,
    weightLimit: number,
    batteryCapacity: number,
  ) {
    const drone = await Drone.create({
      serialNumber,
      model,
      weightLimit,
      batteryCapacity,
      state: "IDLE",
    });
    return drone;
  }

  static async loadDrone(
    serialNumber: string,
    medicationId: number,
    batteryLevel: number,
  ) {
    const drone = await Drone.findOne({
      where: { serialNumber },
    });
    if (!drone) {
      logger.error("Drone not found");
      throw new Error("Drone not found");
    }
    else if (drone.state !== "IDLE") {
      logger.error("Drone is not in IDLE state");
      throw new Error("Drone is not in IDLE state");
    }
    else if (drone.batteryCapacity < batteryLevel) {
      logger.error("Drone cannot be loaded");
      throw new Error("Drone cannot be loaded");
    }else {
      console.log("checking", medicationId)
      const medication = await Medication.findOne({
        where: { id: medicationId },
      });
      if (!medication) {
        logger.error("Medication not Found");
        return new Error("Medication not Found");
      }
      else if (medication.weight > drone.weightLimit) {
        logger.error("Medication too heavy for this drone");
        throw new Error("Medication too heavy for this drone");
      } 
      else {
        await DroneMedication.create({
          droneId: drone.id,
          medicationId: medication.id,
        });
  
        drone.state = "LOADED";
        await drone.save();
        return drone;
      }
    }
  }

  static async checkLoadedMedications(serialNumber: string) {
    const drone = await Drone.findOne({
      where: { serialNumber },
    });
    if (!drone) {
      logger.error("Drone not found");
      throw new Error("Drone not found");
    } else {
      return drone;
    }
  }

  static async checkAvailableDrones() {
    const AvailableDrones = await Drone.findAll({ where: { state: "IDLE" } });
    return AvailableDrones;
  }

  static async checkDroneBattery(serialNumber: string) {
    const drone = await Drone.findOne({ where: { serialNumber } });
    if (!drone) {
      logger.error("Drone not found");
      throw new Error("Drone not found");
    }
    return drone.batteryCapacity;
  }
}
