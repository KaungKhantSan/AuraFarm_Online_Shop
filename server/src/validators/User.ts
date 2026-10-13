import { body, param } from "express-validator";

export const UserValidator = [
  body("username")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Username is required."),
  body("email").isEmail().withMessage("Email must be email format."),
  body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password is required."),
];

export const LoginValidator = [
  body("email").isEmail().withMessage("Email must be email format."),
  body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Password is required."),
];

export const ProfilePictureValidator = [
  body("image_url").notEmpty().withMessage("Image cannot be empty."),
];

export const EmailUpdateValidator = [
  body("email").isEmail().withMessage("Email must be email format."),
];

export const UserNameUpdateSchema = [
  body("username")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Username is required."),
];

export const PasswordUpdateSchema = [
  body("oldPassword")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Old password is require 6 characters."),
  body("newPassword")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("New password is require 6 characters."),
];

export const passwordResetEmailSchema = [
  body("email").isEmail().withMessage("Email must be email format."),
];

export const forgotPasswordSchema = [
  param("token").notEmpty().withMessage("Token is required."),
  body("newPassword")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("New password is require 6 characters."),
];
// username, email, password
