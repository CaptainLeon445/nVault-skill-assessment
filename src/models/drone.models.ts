import { DataTypes, Model } from "sequelize";
class Drone extends Model {
  public id!: number;
  public serialNumber!: string;
  public model!: string;
  public weightLimit!: number;
  public batteryCapacity!: number;
  public state!: string;
}

Drone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    weightLimit: {
      type: DataTypes.NUMBER,
    },
    batteryCapacity: {
      type: DataTypes.NUMBER,
    },
    state: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Drone",
  }
);

export default Drone;
