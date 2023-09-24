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
    batteryCapacity: number
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

  static async loadDrone(serialNumber: string, medicationId: number) {
    const drone = await Drone.findOne({
      where: { serialNumber },
    });
    if (!drone) {
      logger.error("Drone not found");
      throw new Error("Drone not found");
    } else if (drone.state !== "IDLE") {
      logger.error("Drone is not in IDLE state");
      throw new Error("Drone is not in IDLE state");
    } else if (drone.batteryCapacity < 25) {
      logger.error("Drone cannot be loaded");
      throw new Error("Drone cannot be loaded");
    } else {
      const medication = await Medication.findOne({
        where: { id: medicationId },
      });
      if (!medication) {
        logger.error("Medication not Found");
        return new Error("Medication not Found");
      } else if (medication.weight > drone.weightLimit) {
        logger.error("Medication load is too heavy for this drone");
        throw new Error("Medication load is too heavy for this drone");
      } else {
        await DroneMedication.create({
          droneId: drone.id,
          medicationId: medication.id,
        });

        drone.state = "LOADED";
        const obj = await drone.save();
        const data = {
          drone: {
            ...obj.dataValues,
            load: {
              weight: medication.weight,
              name: medication.name,
              code: medication.code,
              image: medication.image,
            },
          },
        };
        return data;
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
      const loaded= await DroneMedication.findOne({
        where: { droneId: drone.id },
      });
      const loadedMedication= await Medication.findOne({
        where: { id: loaded.medicationId },
      });
      const data = {
        drone: {
          ...drone.dataValues,
          load: {
            weight: loadedMedication.weight,
            name: loadedMedication.name,
            code: loadedMedication.code,
            image: loadedMedication.image,
          },
        },
      };
      return data;
    }
  }

  static async checkAvailableDrones() {
    const AvailableDrones = await Drone.findAll({ where: { state: "IDLE" } });
    return AvailableDrones;
  }

  static async getAllDrones() {
    const allDrones = await Drone.findAll();
    return allDrones;
  }

  static async checkDroneBattery(serialNumber: string) {
    const drone = await Drone.findOne({ where: { serialNumber } });
    if (!drone) {
      logger.error("Drone not found");
      throw new Error("Drone not found");
    }
    return drone.batteryCapacity;
  }

  static async checkDroneBatteryLevels() {
    const drones: Drone[] = await this.getAllDrones();
    const batteryLevels: { [serialNumber: string]: number } = {};

    drones.forEach((drone) => {
      batteryLevels[drone.serialNumber] = drone.batteryCapacity;
    });
    return batteryLevels;
  }
}
