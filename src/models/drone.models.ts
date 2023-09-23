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
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    model: {
      type: DataTypes.ENUM('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'),
      allowNull: false,
    },
    weightLimit: {
      type: DataTypes.FLOAT,
      allowNull: false,

    },
    batteryCapacity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'),
      allowNull: false,
      defaultValue: 'IDLE'
    },
  },
  {
    sequelize,
    modelName: "Drone",
    tableName: 'drones'
  }
);

export default Drone;
