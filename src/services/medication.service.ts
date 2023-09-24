import logger from "../logger";
import Medication from "../models/medication.models";

export default class MedicationService {
  static async createMedication(
    name: string,
    weight: number,
    code: string,
    image: number
  ) {
    try {
      const medication = await Medication.create({
        name,
        weight,
        code,
        image,
      });
      return medication;
    } catch (error) {
      logger.info(error);
      throw new Error("Error creating medication");
    }
  }

  static async getMedication(medicationId: number) {
    try {
      const medication = await Medication.findOne({where: {id: medicationId}});
      if (!medication) {
        logger.info("Medication not Found");
        throw new Error("Medication not Found");
      }
      return medication;
    } catch (error) {
      logger.info(error);
      throw new Error("Error fetching medication: ");
    }
  }

  static async getAllMedications() {
    try {
      const medications = await Medication.findAll();
      return medications;
    } catch (error) {
      logger.info(error);
      throw new Error("Error fetching medications: ");
    }
  }
}
