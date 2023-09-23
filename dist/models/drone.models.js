"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Drone extends sequelize_1.Model {
}
Drone.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.STRING,
    },
    batteryCapacity: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "Drone",
});
exports.default = Drone;
