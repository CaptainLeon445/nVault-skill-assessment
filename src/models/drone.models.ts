import { DataTypes, Model } from "sequelize";
class Drone extends Model {}

Drone.init(
  {},
  {
    sequelize,
    modelName: "Drone",
  }
);

export default Drone;
