"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Medication extends sequelize_1.Model {
}
Medication.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Medication",
    tableName: "medications",
});
exports.default = Medication;
