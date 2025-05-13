import { NextFunction, Request, Response } from "express";
import { ApiError } from "./ApiError";
import { STATUS_SERVER_ERROR } from "../src/constants";

type FN = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: FN) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
