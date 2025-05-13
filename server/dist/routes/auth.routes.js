"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registerUser, auth_controller_1.sendOtp);
router.post("/login", auth_controller_1.loginUser);
router.post("/send-otp", auth_controller_1.sendOtp);
router.post("/verify-otp", auth_controller_1.verifyOtp);
router.post("/forgot-password", auth_controller_1.forgotPassword);
router.post("/reset-password/:token", auth_controller_1.resetPassword);
// router.post("/refresh-token", refreshAccessToken);
exports.default = router;
