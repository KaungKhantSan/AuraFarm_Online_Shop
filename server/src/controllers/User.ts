import { NextFunction, Request, Response } from "express";
import aysncHandler from "../utils/asyncHandler";
import { User } from "../models/userSchema";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/authMiddleware";
import { deleteImage, uploadSingleImage } from "../utils/cloudinary";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail";
import { forgetPasswordEmailTemplate } from "../utils/emailTemplate";
import crypto from "crypto";

//@route method - POST | path - api/register
//@desc Create New User
//@access Public
export const RegisterUser = aysncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401);
      throw new Error("User is already existed with this Email.");
    }

    const new_User = await User.create({
      username,
      email,
      password,
    });

    if (new_User) {
      res.status(201).json({
        _id: new_User._id,
        username: new_User.username,
        email: new_User.email,
      });
    }
  },
);

//@route method - POST | path - api/login
//@desc Login User
//@access Public

export const LoginUser = aysncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser && (await existingUser.MatchPassword(password))) {
    //token

    generateToken(res, existingUser._id);

    res.status(201).json({
      _id: existingUser._id,
    });
  } else {
    res.status(401);
    throw new Error("User is not Found with this Credentials.");
  }
});

//@route method - POST | path - api/logout
//@desc Logout User
//@access Public

export const LogoutUser = aysncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User is Logout." });
});

//@route method - POST | path - api/upload
//desc upload profile picture
//@access private

export const UploadAvatar = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { image_url } = req.body;

    const userDoc = await User.findByIdAndUpdate(user?._id);

    if (userDoc?.avatar?.url) {
      await deleteImage(userDoc.avatar.public_alt);
    }

    const response = await uploadSingleImage(image_url, "AuraFarming/avatar");

    await User.findByIdAndUpdate(user?._id, {
      avatar: {
        url: response.image_url,
        public_alt: response.public_alt,
      },
    });

    res.status(201).json({ message: "Profile picture upload success." });
  },
);

//@route method - GET | path - api/me
//desc get userInfo
//@access private

export const GetUserInfo = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;

    const userDoc = await User.findById(user?._id).select("-password");

    res.status(200).json(userDoc);
  },
);

//@route method - POST | path - api/emailUpdate
//desc Update Email
//access Private

export const emailUpdate = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { email } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      throw new Error("Email is owned by another User.");
    }

    (await User.findByIdAndUpdate(user?._id, {
      email,
    }),
      res.status(200).json({ message: "Email update success." }));
  },
);

//@route method - POST | path - api/userNameUpdate
//desc Update Username
//access Private

export const userNameUpdate = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { username } = req.body;

    (await User.findByIdAndUpdate(user?._id, {
      username,
    }),
      res.status(200).json({ message: "Username update success." }));
  },
);

//@route method - POST | path - api/passwordUpdate
//desc Update new password
//access Private

export const passwordUpdate = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;

    const existingUser = await User.findById(user?._id).select("+password");

    if (!existingUser) {
      throw new Error("Something went wrong!");
    }

    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      existingUser.password,
    );

    if (!isPasswordMatched) {
      throw new Error("Old password is wrong.");
    }

    existingUser.password = newPassword;
    await existingUser.save();
    res.status(200).json({ message: "Password update success." });
  },
);

//@route method - POST | path - api/forgotPasswordReset
//desc send reset forgot password email
//access Private

export const passwordForgotReset = aysncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("Email not found.");
    }

    const token = existingUser.generateResetPasswordToken();
    await existingUser.save();

    const resetPasswordUrl = `${process.env.CLIENT_URl}/reset-password/${token}`;
    const body = forgetPasswordEmailTemplate(resetPasswordUrl);

    try {
      await sendEmail({
        receiver_mail: existingUser.email!,
        subject: "Reset Password - Aura Farming",
        body,
      });
    } catch (error) {
      existingUser.resetPasswordToken = undefined;
      existingUser.resetPasswordTokenExpire = undefined;
      await existingUser.save();
    }

    res.status(200).json({ message: "Password reset Email send." });
  },
);

//@route method - POST | path - api/reset-password/token
//desc reset the forgot password
//access Private

export const resetForgotPassword = aysncHandler(
  async (req: AuthRequest, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token as string)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid token. Request email again.");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password Changed." });
  },
);
