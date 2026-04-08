
import { body, validationResult } from "express-validator";

export const validateResume = [
  body("personalInfo.name").notEmpty().withMessage("Name is required"),
  body("personalInfo.email").isEmail().withMessage("Valid email is required"),
  body("personalInfo.phone").notEmpty().withMessage("Phone number is required"),
  body("skills").isArray({ min: 1 }).withMessage("Skills array cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];