import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const Token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("token", Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });
};

export default generateToken;
