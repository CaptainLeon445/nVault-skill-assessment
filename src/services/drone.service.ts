import Drone from "../models/drone.models";
import DroneMedication from "../models/droneMedication.model";
import Medication from "../models/medication.models";

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

      const medication = await Medication.findByPk(medicationId)
      if (!medication) {
        throw new Error ('Medication not Found')
      }
      if (medicationWeight > drone.weightLimit){
        throw new Error('Medication too heavy for this drone');
      }
      await DroneMedication.create({
        droneId : drone.id,
        medicationId: medication.id
      })

      drone.state = 'LOADED';
      await drone.save();
      return drone;
    } catch (error) {
      throw new Error("Error loading this Drone");
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
