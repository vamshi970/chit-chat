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
exports.AuthService = void 0;
const constants_1 = require("../src/constants");
const ApiError_1 = require("../utils/ApiError");
const otp_generator_1 = __importDefault(require("otp-generator"));
const helpers_1 = require("../helpers");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    constructor(authRepo) {
        this.authRepo = authRepo;
    }
    registerUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, firstName, lastName, }) {
            if (!email || !password)
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Email and Password are required");
            const queryObj = { email };
            const user = yield this.authRepo.getUser(queryObj);
            if (user && user.verified)
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "User already exists");
            const hashedPassword = yield (0, helpers_1.genHash)(password);
            const userObj = { firstName, lastName, password: hashedPassword };
            if (user) {
                const updatedUser = yield this.authRepo.updateUserByEmail(email, userObj);
                return updatedUser;
            }
            const newUser = yield this.authRepo.createUser(Object.assign(Object.assign({}, userObj), { email }));
            return newUser;
        });
    }
    sendOtp(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const otp = otp_generator_1.default.generate(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const hashed_Otp = yield (0, helpers_1.genHash)(otp);
            const otp_expiry_time = Date.now() + 10 * 60 * 1000; //* 10 min
            const modifyObj = { otp: hashed_Otp, otp_expiry_time };
            const user = yield this.authRepo.updateUserById(id, modifyObj);
            if (!user)
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User doesn't exist");
            return { user, otp };
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObj = { email, otp_expiry_time: { $gt: Date.now() } };
            const user = yield this.authRepo.getUser(queryObj);
            if (!user)
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "Email is invalid or OTP expired");
            if (!(yield user.correctOtp(user.otp, otp)))
                throw new ApiError_1.ApiError(constants_1.STATUS_UNAUTHORIZED, "Otp is incorrect. Please try again");
            /*
                Here we can even create an obj with both verified and otp fields and save
                their value to the database by using findByIDAndUpdate else we can easily
                do the same process like this by changing the retrieved user
            */
            user.verified = true;
            user.otp = undefined;
            /*
                Here generally we have to set an option to save property of mongoose
                validateBeforSave -> false
                this will make sure not to validate before saving as we are setting a
                value of a field to undefined which will throw an error but as we already
                set the value of this property as string | undefined in the TS interface
                there is no need in that
            */
            yield user.save();
            const { accessToken, refreshToken } = yield (0, helpers_1.generateTokens)(user._id);
            return { accessToken, refreshToken };
        });
    }
    loginUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            if (!email || !password)
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Email and Password are required");
            const queryObj = { email };
            const user = yield this.authRepo.getUser(queryObj);
            if (!user)
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "Email or Password is incorrect");
            if (!(yield user.correctPassword(user.password, password)))
                throw new ApiError_1.ApiError(constants_1.STATUS_UNAUTHORIZED, "Invalid user credentials");
            const { accessToken, refreshToken } = yield (0, helpers_1.generateTokens)(user._id);
            return { accessToken, refreshToken };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObj = { email };
            const user = yield this.authRepo.getUser(queryObj);
            if (!user)
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "User not found");
            const resetToken = yield user.createPasswordResetToken();
            console.log(resetToken);
            const resetURL = `${helpers_1.env.CORS_ORIGIN}/reset-password/${resetToken}`;
            return { resetURL, user };
        });
    }
    resetPassword(password, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password)
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Password is required");
            if (!resetToken)
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Token is required");
            const hashedResetToken = crypto_1.default.createHash("sha256").update(resetToken).digest("hex");
            const queryObj = {
                passwordResetToken: hashedResetToken,
                passwordResetExpires: { $gt: Date.now() },
            };
            const user = yield this.authRepo.getUser(queryObj);
            if (!user)
                throw new ApiError_1.ApiError(constants_1.STATUS_NOT_FOUND, "Token is Invalid or Expired");
            const hashedPassword = yield (0, helpers_1.genHash)(password);
            user.password = hashedPassword;
            user.passwordChangedAt = new Date();
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save();
            const token = (0, helpers_1.genAccessToken)(user._id);
            return token;
        });
    }
}
exports.AuthService = AuthService;
