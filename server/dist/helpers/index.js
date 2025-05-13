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
exports.generateTokens = exports.genHash = exports.genAccessToken = exports.getSocketId = exports.emitEvent = exports.env = void 0;
const envalid_1 = require("envalid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validators_1 = require("envalid/dist/validators");
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("../src/constants");
const server_1 = require("../src/server");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URI: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
    NODE_ENV: (0, validators_1.str)(),
    JWT_SECRET: (0, validators_1.str)(),
    SERVICE_MAIL: (0, validators_1.email)(),
    SERVICE_PASSWORD: (0, validators_1.str)(),
    CORS_ORIGIN: (0, validators_1.str)(),
    ACCESS_TOKEN_EXPIRY: (0, validators_1.str)(),
    REFRESH_TOKEN_EXPIRY: (0, validators_1.str)(),
});
const emitEvent = (req, members, event, data) => {
    req.app.get("io").to(members).emit(event, data);
};
exports.emitEvent = emitEvent;
const getSocketId = (onlineUserIds) => {
    const socketIds = Array.from(onlineUserIds.values());
    return socketIds;
};
exports.getSocketId = getSocketId;
/**
 * Generate an access token for a user
 * @param id The id of the user
 */
const genAccessToken = (id) => {
    if (!id) {
        throw new Error("User ID is undefined");
    }
    const jwtOptions = {
        expiresIn: exports.env.ACCESS_TOKEN_EXPIRY,
    };
    const token = jsonwebtoken_1.default.sign({ id }, exports.env.JWT_SECRET, jwtOptions);
    return token;
};
exports.genAccessToken = genAccessToken;
const genHash = (field) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedField = yield bcryptjs_1.default.hash(field, 12);
    return hashedField;
});
exports.genHash = genHash;
/**
 * Generate an access token for a user
 * @param id The id of the user
 */
const genRefreshToken = (id) => {
    if (!id) {
        throw new Error("User ID is undefined");
    }
    const jwtOptions = {
        expiresIn: exports.env.REFRESH_TOKEN_EXPIRY,
    };
    const token = jsonwebtoken_1.default.sign({ id }, exports.env.JWT_SECRET, jwtOptions);
    return token;
};
const generateTokens = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield server_1.userRepository.getUserById(id);
        const accessToken = (0, exports.genAccessToken)(id);
        const refreshToken = genRefreshToken(id);
        if (user) {
            user.refreshToken = refreshToken;
            yield user.save({ validateBeforeSave: false });
        }
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError_1.ApiError(constants_1.STATUS_SERVER_ERROR, "Some internal server occured.Couldn't generate the tokens");
    }
});
exports.generateTokens = generateTokens;
