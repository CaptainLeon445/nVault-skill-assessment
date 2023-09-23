"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Drone extends sequelize_1.Model {
    static associate(models) {
        Drone.belongsToMany(models.Medication, {
            through: "DroneMedication",
            foreignKey: "droneId",
        });
    }
}
Drone.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    serialNumber: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    model: {
        type: sequelize_1.DataTypes.ENUM("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"),
        allowNull: false,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    batteryCapacity: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM("IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING"),
        allowNull: false,
        defaultValue: "IDLE",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Drone",
    tableName: "drones",
});
exports.default = Drone;
