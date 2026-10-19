import { body } from "express-validator";

// export const CreateProductValidator = [
//   body("name").notEmpty().withMessage("Name is required."),
//   body("description").notEmpty().withMessage("Description is required."),
//   body("price").isNumeric().withMessage("Price must be number."),
//   body("category").notEmpty().withMessage("Category is required."),
//   body("instock_count").isInt().withMessage("Instock_Count must be Integer."),
//   body("images").isArray({ min: 1 }).withMessage("Image must be an Array."),
//   body("images.*.url").notEmpty().withMessage("Image must contain URL."),
//   body("images.*.public_alt")
//     .notEmpty()
//     .withMessage("Each image must have public_alt."),
//   body("color").isArray({ min: 1 }).withMessage("Color must be an Array."),
//   body("sizes").isArray({ min: 1 }).withMessage("Size must be an Array."),
//   body("is_new_arrival")
//     .isBoolean()
//     .withMessage("is_new_arrival must be boolean."),
//   body("is_feature").isBoolean().withMessage("is_feature must be boolean."),
//   body("rating_count").isInt().withMessage("Rating_count must be integer."),
// ];

// name,
//       description,
//       price,
//       category,
//       instock_count,
//       images,
//       color,
//       sizes,
//       is_new_arrival,
//       is_feature,
//       rating_count,
