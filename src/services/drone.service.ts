import Drone from "../models/drone.models";

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
    medicationWeight: number,
    batteryLevel: number
  ) {
    try {
      const drone = await Drone.findOne({
        where: {serialNumber}
      });
      if (!drone){
        throw new Error("Drone not found")
      }
      if (drone.state !== 'IDLE'){
        throw new Error ("Drone is not in IDLE state")
      }
      if (drone.batteryCapacity < batteryLevel || drone.weightLimit < medicationWeight){
        throw new Error ("Drone cannot be loaded")
      }
      return drone;
    } catch (error) {
      throw new Error("Error Registering Drone");
    }
  }

  static async checkLoadedMedications(
    serialNumber: string,
  ) {
    try {
      const drone = await Drone.findOne({
        where: {serialNumber}
      });
      if (!drone){
        throw new Error("Drone not found")
      }
      return drone;
    } catch (error) {
      throw new Error("Error Registering Drone");
    }
  }
}
