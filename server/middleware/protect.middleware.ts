import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/index";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { IJWT_PAYLOAD } from "../interfaces/tokenI";
import { env } from "../helpers";

export const verify = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const webToken = req.headers.auth as string;
    const JWT_SECRET = env.JWT_SECRET;

    if (!webToken) {
      throw new ApiError(400, "Couldn't find the token");
    }

    const [bearer, token] = webToken.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new ApiError(401, "Invalid token format");
    }

    // jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    //   if (err) {
    //     console.log(err);
    //     if (err.name === "TokenExpiredError") {
    //       throw new ApiError(401, "Token expired. Please log in again.");
    //     }
    //     throw new ApiError(401, "Invalid token. Please provide a valid token.");
    //   }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new ApiError(401, "Invalid token. Please provide a valid token.");
    }

    const decodedUser = decoded as IJWT_PAYLOAD;

    const user = await User.findById(decodedUser.id);

    if (!user) {
      throw new ApiError(400, "User doesn't exist");
    }

    req.userId = decodedUser.id;
    next();
  }
);
