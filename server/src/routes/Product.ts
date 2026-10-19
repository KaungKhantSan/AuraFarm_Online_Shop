import { Router } from "express";
import {
  createProduct,
  DeleteProduct,
  getFeaturedProduct,
  getNewArrivalProduct,
  getproductById,
  getProductMetaData,
  getProductWithFilter,
  UpdateProduct,
} from "../controllers/Product";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { upload } from "../utils/upload";

const router = Router();

router.post(
  "/product",
  protect,
  isAdmin,
  upload.array("images"),
  createProduct,
);
router.put("/product/:id", protect, isAdmin, UpdateProduct);
router.delete("/product/:id", protect, isAdmin, DeleteProduct);

router.get("/product", getProductWithFilter);
router.get("/product/new", getNewArrivalProduct);
router.get("/product/isfeatured", getFeaturedProduct);
router.get("/product/:id", getproductById);
router.get("/filter/meta", getProductMetaData);

export default router;
