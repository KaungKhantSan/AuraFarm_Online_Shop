import { NextFunction, Request, Response } from "express";
import aysncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { User } from "../models/userSchema";

interface User {
  name: string;
  email: string;
  _id: string | Types.ObjectId;
  role: "customer" | "admin";
}

export interface AuthRequest extends Request {
  user?: User;
}

export const protect = aysncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (!decoded) {
        res.status(401);
        throw new Error("Not Authorized.");
      }

      req.user = (await User.findById(decoded.userId).select(
        "-password",
      )) as User;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized. Invalid Token.");
    }
  },
);

export const isAdmin = aysncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
      res.status(401);
      throw new Error("You are not Admin");
    }
    next();
  },
);
