import { Router } from "express";
import {
  emailUpdate,
  GetUserInfo,
  LoginUser,
  LogoutUser,
  passwordForgotReset,
  passwordUpdate,
  RegisterUser,
  resetForgotPassword,
  UploadAvatar,
  userNameUpdate,
} from "../controllers/User";
import {
  EmailUpdateValidator,
  forgotPasswordSchema,
  LoginValidator,
  passwordResetEmailSchema,
  PasswordUpdateSchema,
  ProfilePictureValidator,
  UserNameUpdateSchema,
  UserValidator,
} from "../validators/User";
import { validateUser } from "../middlewares/UserValidate";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", UserValidator, validateUser, RegisterUser);
router.post("/login", LoginValidator, validateUser, LoginUser);
router.post("/logout", LogoutUser);

router.post(
  "/upload",
  ProfilePictureValidator,
  validateUser,
  protect,
  UploadAvatar,
);

router.get("/me", protect, GetUserInfo);
router.post(
  "/emailUpdate",
  EmailUpdateValidator,
  validateUser,
  protect,
  emailUpdate,
);
router.post(
  "/userNameUpdate",
  UserNameUpdateSchema,
  validateUser,
  protect,
  userNameUpdate,
);
router.post(
  "/passwordUpdate",
  PasswordUpdateSchema,
  validateUser,
  protect,
  passwordUpdate,
);
router.post(
  "/forgotPasswordReset",
  passwordResetEmailSchema,
  validateUser,
  passwordForgotReset,
);

router.post(
  "/reset-password/:token",
  forgotPasswordSchema,
  validateUser,
  protect,
  resetForgotPassword,
);
export default router;
