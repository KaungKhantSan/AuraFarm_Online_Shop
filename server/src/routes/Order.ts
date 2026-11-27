import { Router } from "express";
import { CreateOrderSession } from "../controllers/OrderCreate";
import { protect } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/ProductValidate";
import { validateOrder } from "../validators/Order";

const router = Router();

router.post(
  "/create-order",
  protect,
  validateOrder,
  validateRequest,
  CreateOrderSession,
);

export default router;
