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
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "Medication",
});
exports.default = Medication;
