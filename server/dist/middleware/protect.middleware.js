"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../models/index");
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const helpers_1 = require("../helpers");
exports.verify = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const webToken = req.headers.auth;
    const JWT_SECRET = helpers_1.env.JWT_SECRET;
    if (!webToken) {
        throw new ApiError_1.ApiError(400, "Couldn't find the token");
    }
    const [bearer, token] = webToken.split(" ");
    if (bearer !== "Bearer" || !token) {
        throw new ApiError_1.ApiError(401, "Invalid token format");
    }
    // jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    //   if (err) {
    //     console.log(err);
    //     if (err.name === "TokenExpiredError") {
    //       throw new ApiError(401, "Token expired. Please log in again.");
    //     }
    //     throw new ApiError(401, "Invalid token. Please provide a valid token.");
    //   }
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (!decoded) {
        throw new ApiError_1.ApiError(401, "Invalid token. Please provide a valid token.");
    }
    const decodedUser = decoded;
    const user = yield index_1.User.findById(decodedUser.id);
    if (!user) {
        throw new ApiError_1.ApiError(400, "User doesn't exist");
    }
    req.userId = decodedUser.id;
    next();
}));
