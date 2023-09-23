import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const registerDroneSchema = Joi.object({
  serialNumber: Joi.string().max(100).required(),
  model: Joi.string()
    .valid("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight")
    .required(),
  weightLimit: Joi.number().max(500).required(),
  batteryCapacity: Joi.number().required(),
});

export const validateDroneRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerDroneSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: error.details[0].message,
      },
    });
  }

  next();
};
