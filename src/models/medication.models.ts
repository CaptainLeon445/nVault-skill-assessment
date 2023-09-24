import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

class Medication extends Model {
  public id!: number;
  public name!: string;
  public weight!: number;
  public code!: string;
  public image!: string;

  static associate(models: any) {
    Medication.belongsToMany(models.Drone, {
      through: "DroneMedication",
      foreignKey: "medicationId",
    });
  }
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
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Medication",
    tableName: "medications",
  }
);

export default Medication;
