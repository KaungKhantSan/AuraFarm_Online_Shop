import { Router } from "express";
import { CreateOrderSession } from "../controllers/OrderCreate";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create-order", protect, CreateOrderSession);

export default router;
