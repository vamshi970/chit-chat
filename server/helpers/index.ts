import { Request } from "express";
import { cleanEnv } from "envalid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { email, port, str } from "envalid/dist/validators";
import { Types } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { STATUS_SERVER_ERROR } from "../src/constants";
import { userRepository } from "../src/server";
export const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  NODE_ENV: str(),
  JWT_SECRET: str(),
  SERVICE_MAIL: email(),
  SERVICE_PASSWORD: str(),
  CORS_ORIGIN: str(),
  ACCESS_TOKEN_EXPIRY: str(),
  REFRESH_TOKEN_EXPIRY: str(),
});

export const emitEvent = (req: Request, members: string[], event: string, data: any) => {
  req.app.get("io").to(members).emit(event, data);
};

export const getSocketId = (onlineUserIds: Map<string, string>) => {
  const socketIds = Array.from(onlineUserIds.values());
  return socketIds;
};

/**
 * Generate an access token for a user
 * @param id The id of the user
 */

export const genAccessToken = (id: Types.ObjectId | undefined) => {
  if (!id) {
    throw new Error("User ID is undefined");
  }

  const jwtOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  };
  const token = jwt.sign({ id }, env.JWT_SECRET, jwtOptions);
  return token;
};

export const genHash = async (field: string) => {
  const hashedField = await bcrypt.hash(field, 12);
  return hashedField;
};

/**
 * Generate an access token for a user
 * @param id The id of the user
 */

const genRefreshToken = (id: Types.ObjectId | undefined) => {
  if (!id) {
    throw new Error("User ID is undefined");
  }

  const jwtOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  };
  const token = jwt.sign({ id }, env.JWT_SECRET, jwtOptions);
  return token;
};

export const generateTokens = async (id: Types.ObjectId) => {
  try {
    const user = await userRepository.getUserById(id);
    const accessToken = genAccessToken(id);
    const refreshToken = genRefreshToken(id);

    if (user) {
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
    }
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      STATUS_SERVER_ERROR,
      "Some internal server occured.Couldn't generate the tokens"
    );
  }
};
