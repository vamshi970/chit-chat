import { Schema, Types, model } from "mongoose";
import { IUser } from "../interfaces/userI";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const friendsSchema = new Schema({
  id: { type: Types.ObjectId, ref: "User" },
  firstName: String,
  avatar: String,
});

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    about: {
      type: String,
      default: "Hey there! I am using ChitChat.",
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    otp: {
      type: String,
    },
    otp_expiry_time: {
      type: Number,
    },

    friends: [friendsSchema],
    notifications: [
      {
        sender: {
          type: Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.correctPassword = async (password: string, enteredPassword: string) => {
  const match = await bcrypt.compare(enteredPassword, password);
  return match;
};

userSchema.methods.correctOtp = async (otp: string, enteredOtp: string) => {
  const match = await bcrypt.compare(enteredOtp, otp);
  return match;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  /*
      Create a set of random values and convert that to string
      of Hex values and store that in resetToken
  */

  const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  // Hash that string

  this.passwordResetToken = hashedResetToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10min

  await this.save();

  return resetToken;
};

userSchema.methods.passwordChangedAfter = function (timestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime();
    return timestamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

export const User = model<IUser>("User", userSchema);
