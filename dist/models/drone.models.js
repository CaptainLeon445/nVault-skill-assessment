"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Drone extends sequelize_1.Model {
}
Drone.init({}, {
    sequelize,
    modelName: "Drone",
});
exports.default = Drone;
