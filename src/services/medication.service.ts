import logger from "../logger";
import { AppError } from "../middleware/AppError";
import Medication from "../models/medication.models";

export default class MedicationService {
  static async createMedication(
    name: string,
    weight: number,
    code: string,
  ) {
    // Check if the 'code' is already used in the database
    const existingMedication = await Medication.findOne({
      where: { code: code },
    });
    if (existingMedication) {
      logger.error("Medication code is not Found");
      throw new AppError("Code is not unique",404);
    } else {
      const medication = await Medication.create({
        name,
        weight,
        code
      });
      return medication;
    }
  }

  static async addImageToMedication(
    image: string,
    medicationId: number
  ) {
    
    const existingMedication = await Medication.findByPk(medicationId);
    if (!existingMedication) {
      logger.error("Medication Load is not Found");
      throw new AppError("Medication Load is not found",404);
    } else {
      existingMedication .image = image
      const data =await existingMedication .save()
      return data;
    }
  }

  static async getMedication(medicationId: number) {
    const medication = await Medication.findOne({
      where: { id: medicationId },
    });
    if (!medication) {
      logger.error("Medication not Found");
      throw new AppError("Medication not Found",404);
    }
    return medication;
  }
  static async getAllMedications() {
    const medications = await Medication.findAll();
    return medications;
  }
}
