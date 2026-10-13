import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar?: {
    url: string;
    public_alt: string;
  };
  resetPasswordToken: string | undefined;
  resetPasswordTokenExpire: number | undefined;
  MatchPassword(enteredPassword: string): boolean;
  generateResetPasswordToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: [
        {
          url: String,
          public_alt: String,
        },
      ],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Number,
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.MatchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateResetPasswordToken = function (): string {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;

  return token;
};

export const User = mongoose.model<IUser>("User", userSchema);
