import { DataTypes, Model } from "sequelize";

class DroneMedication extends Model {
  public id!: number;
  public droneId!: number;
  public medicationId!: number;

  static associate(models: any) {
    DroneMedication.belongsTo(models.Drone, {
      foreignKey: "droneId",
    });
    DroneMedication.belongsTo(models.Medication, {
      foreignKey: "medicationId",
    });
  }
}

DroneMedication.init(
  {
    droneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DroneMedication",
    tableName: "drone_medications",
  }
);

export default DroneMedication;
