import Drone from "../models/drone.models";
import DroneMedication from "../models/droneMedication.model";
import Medication from "../models/medication.models";
import logger from "../logger";
import { AppError } from "../middleware/AppError";
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
      throw new AppError("Drone not found", 404);
    } else if (drone.state !== "IDLE") {
      logger.error("Drone is not in IDLE state");
      throw new AppError("Drone is not in IDLE state", 404);
    } else if (drone.batteryCapacity < 25) {
      logger.error("Drone cannot be loaded");
      throw new AppError("Drone cannot be loaded", 404);
    } else {
      const medication = await Medication.findOne({
        where: { id: medicationId },
      });
      if (!medication) {
        logger.error("Medication not Found");
        return new AppError("Medication not Found", 404);
      } else if (medication.weight > drone.weightLimit) {
        logger.error("Medication load is too heavy for this drone");
        throw new AppError("Medication load is too heavy for this drone", 404);
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
      throw new AppError("Drone not found", 404);
    } else {
      const loaded = await DroneMedication.findOne({
        where: { droneId: drone.id },
      });
      const loadedMedication = await Medication.findOne({
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
      throw new AppError("Drone not found", 404);
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
