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
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medication",
    tableName: "medications",
  }
);

export default Medication;
