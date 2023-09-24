import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import Joi from "joi";
import multer from "multer";
import sharp from "sharp";
import Medication from "../models/medication.models";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 0.5 * 1024 * 1024,
  },
});
const medicationSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z0-9-_]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name can only contain letters, numbers, -, and _",
      "any.required": "Name is required",
    }),
  weight: Joi.number().required().messages({
    "number.base": "Weight must be a number",
    "any.required": "Weight is required",
  }),
  code: Joi.string()
    .regex(/^[A-Z0-9_]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Code can only contain uppercase letters, numbers, and _",
      "any.required": "Code is required",
    }),
});

// Middleware function to validate Medication objects
export const validateMedicationSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = medicationSchema.validate(req.file);
  if (error) {
    logger.error(error.details[0].message);
    return res.status(400).json({
      status: "fail",
      error: {
        message: error.details[0].message,
        body: req.body,
        file: req.file,
        req,
      },
    });
  }
  next();
};

export const uploadImage = upload.single("image");

export const storeImageInFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    req.body.image = `medication-${Date.now()}-img.jpeg`;
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`src/public/medications/img/${req.body.image}`);
    next();
  } catch (error) {
    console.error("Error storing image:", error);
    next(new Error(error.message));
  }
};
