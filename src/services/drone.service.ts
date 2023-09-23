import Drone from "../models/drone.models";
import DroneMedication from "../models/droneMedication.model";
import Medication from "../models/medication.models";
import logger from "../logger";
export default class DroneService {
  static async registerDrone(
    serialNumber: string,
    model: string,
    weightLimit: number,
    batteryCapacity: number
  ) {
    try {
      const drone = await Drone.create({
        serialNumber,
        model,
        weightLimit,
        batteryCapacity,
        state: "IDLE",
      });
      return drone;
    } catch (error) {
      throw new Error("Error Registering Drone");
    }
  }

  static async loadDrone(
    serialNumber: string,
    batteryLevel: number,
    medicationId: number
  ) {
    try {
      const drone = await Drone.findOne({
        where: { serialNumber },
      });
      if (!drone) {
        logger.info("Drone not found");
        throw new Error("Drone not found");
      }
      if (drone.state !== "IDLE") {
        logger.info("Drone is not in IDLE state");
        throw new Error("Drone is not in IDLE state");
      }
      if (drone.batteryCapacity < batteryLevel) {
        logger.info("Drone cannot be loaded");
        throw new Error("Drone cannot be loaded");
      }

      const medication = await Medication.findByPk(medicationId);
      if (!medication) {
        logger.info("Medication not Found");
        throw new Error("Medication not Found");
      }
      if (medication.weight > drone.weightLimit) {
        logger.info("Medication too heavy for this drone");
        throw new Error("Medication too heavy for this drone");
      }
      await DroneMedication.create({
        droneId: drone.id,
        medicationId: medication.id,
      });

      drone.state = "LOADED";
      await drone.save();
      return drone;
    } catch (error) {
      logger.info(error);
      throw new Error("Error loading this Drone");
    }
  }

  static async checkLoadedMedications(serialNumber: string) {
    try {
      const drone = await Drone.findOne({
        where: { serialNumber },
      });
      if (!drone) {
        logger.info("Drone not found");
        throw new Error("Drone not found");
      }
      return drone;
    } catch (error) {
      logger.info(error);
      throw new Error("Error Registering Drone");
    }
  }

  static async checkAvailableDrones() {
    try {
      const AvailableDrones = await Drone.findAll({ where: { state: "IDLE" } });
      return AvailableDrones;
    } catch (error) {
      logger.info(error);
      throw new Error("Error checking available drones: ");
    }
  }

  static async checkDroneBattery(serialNumber: string) {
    try {
      const drone = await Drone.findOne({ where: { serialNumber } });
      if (!drone) {
        logger.info("Drone not found");
        throw new Error("Drone not found");
      }
      return drone.batteryCapacity;
    } catch (error) {
      logger.info(error);
      throw new Error("Error checking drone battery level: ");
    }
  }
}
