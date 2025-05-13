import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  ForgotPasswordType,
  LoginType,
  RegisterType,
  ResetPasswordType,
  VerifyOtpType,
} from "../types/auth.types";
import { api } from "./axios";

export const login: LoginType = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup: RegisterType = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const verifyOtp: VerifyOtpType = async ({ otp }) => {
  const { getItem, removeItem } = useLocalStorage();

  const email = getItem("email");
  if (!email || (email.email) || !otp) return;

  const response = await api.post("/auth/verify-otp", {
    email,
    otp,
  });
  removeItem("email");
  return response.data;
};

export const forgotPassword: ForgotPasswordType = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const resetPassword: ResetPasswordType = async ({
  data,
  resetToken,
}) => {
  const response = await api.post(`/auth/reset-password/${resetToken}`, data);
  return response.data;
};
