"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Medication extends sequelize_1.Model {
}
Medication.init({}, {
    sequelize,
    modelName: "Medication",
});
exports.default = Medication;
