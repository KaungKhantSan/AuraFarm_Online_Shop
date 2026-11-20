import { body, ValidationChain } from "express-validator";

export const validateOrder: ValidationChain[] = [
  // Validate items array
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array and contain at least one item"),

  // Validate fields inside each item in the array
  body("items.*.productId")
    .exists({ checkFalsy: true })
    .withMessage("Product ID is required for each item")
    .isMongoId()
    .withMessage("Invalid product ID format"),

  body("items.*.name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer of at least 1"),

  body("items.*.size").trim().notEmpty().withMessage("Size is required"),

  body("items.*.color").trim().notEmpty().withMessage("Color is required"),

  // Validate bill
  body("bill")
    .isFloat({ min: 0 })
    .withMessage("Bill must be a positive number"),

  // Validate optional Stripe fields
  body("paymentIntentId")
    .optional()
    .isString()
    .withMessage("Payment Intent ID must be a string"),

  body("stripeSessionId")
    .optional()
    .isString()
    .withMessage("Stripe Session ID must be a string"),
];
