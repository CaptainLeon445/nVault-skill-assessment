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
          throw new Error("Error creating medication");
        }
      }
}


