import { DataTypes, Model } from "sequelize";
class Medication extends Model {
  public id!: number;
  public name!: string;
  public weight!: number;
  public code!: string;
  public image!: string;
}

Medication.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.NUMBER,
    },
    code: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Medication",
  }
);

export default Medication;
