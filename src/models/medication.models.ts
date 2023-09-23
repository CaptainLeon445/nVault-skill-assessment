import { DataTypes, Model } from "sequelize";
class Medication extends Model {}

Medication.init(
  {},
  {
    sequelize,
    modelName: "Medication",
  }
);

export default Medication;
