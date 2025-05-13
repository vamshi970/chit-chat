import express from "express";
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  // refreshAccessToken,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", registerUser, sendOtp);
router.post("/login", loginUser);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// router.post("/refresh-token", refreshAccessToken);

export default router;
