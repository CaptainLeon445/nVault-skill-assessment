import Joi from "joi";

const registerDroneSchema = Joi.object({
  serialNumber: Joi.string().max(100).required(),
  model: Joi.string()
    .valid("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight")
    .required(),
  weightLimit: Joi.number().max(500).required(),
  batteryCapacity: Joi.number().required(),
});

export const validateRegisterDrone = (data: any) => {
  return registerDroneSchema.validate(data);
};
