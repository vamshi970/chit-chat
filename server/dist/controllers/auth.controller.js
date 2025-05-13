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
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.verifyOtp = exports.sendOtp = exports.registerUser = void 0;
const mailer_1 = require("../utils/mailer");
const otp_1 = __importDefault(require("../templates/otp"));
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const resetPassword_1 = __importDefault(require("../templates/resetPassword"));
const server_1 = require("../src/server");
const constants_1 = require("../src/constants");
/*------------------- SignUp -------------------*/
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    /*
    @ Don't create a new user/object in database directly with this req.body
      as there might be a chance that use filled the type of fields that are
      present in the Schema but not filled by the user
  */
    const user = yield server_1.authService.registerUser({ email, password, firstName, lastName });
    if (!user)
        return;
    req.userId = user._id;
    next();
}));
/*------------------- Send Otp -------------------*/
exports.sendOtp = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    if (!userId)
        return;
    const { user, otp } = yield server_1.authService.sendOtp(userId);
    (0, mailer_1.sendMail)({
        to: user.email,
        html: (0, otp_1.default)(otp),
    });
    res.status(200).json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, {}, "Otp sent successfully"));
}));
/*------------------- Verify Otp -------------------*/
exports.verifyOtp = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    console.log(email, otp);
    const { accessToken, refreshToken } = yield server_1.authService.verifyOtp(email, otp);
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, { accessToken, refreshToken }, "User verified successfully"));
}));
/*------------------- Login -------------------*/
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = yield server_1.authService.loginUser({ email, password });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, { accessToken, refreshToken }, "Login Successful"));
}));
/*------------------- Forgot Password -------------------*/
exports.forgotPassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { user, resetURL } = yield server_1.authService.forgotPassword(email);
    (0, mailer_1.sendMail)({
        to: user.email,
        html: (0, resetPassword_1.default)(resetURL, user.firstName),
    });
    res.status(200).json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, {}, "Reset token sent successfully"));
}));
/*------------------- Reset Password -------------------*/
exports.resetPassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const resetToken = req.params.token;
    const token = yield server_1.authService.resetPassword(password, resetToken);
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, { accessToken: token }, "Password Reseted Successfully"));
}));
/*------------------- Refresh Token -------------------*/
// export const refreshAccessToken = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const refreshToken = req.headers.auth as string;
//     if (!refreshToken) {
//       throw new ApiError(STATUS_BAD_REQUEST, "Refresh Token is required");
//     }
//     const decodedToken = jwt.verify(refreshToken, env.JWT_SECRET) as IJWT_PAYLOAD;
//     const user = await User.findById(decodedToken?.id);
//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token");
//     }
//     if (refreshToken !== user?.refreshToken) {
//       throw new ApiError(401, "Refresh token is expired or used");
//     }
//     const accessToken = genAccessToken(user._id);
//   }
// );
