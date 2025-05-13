import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
  about: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const otpSchmea = z.object({
  otp: z.string().min(4),
});0

export type LoginFormTypes = z.infer<typeof loginSchema>;
export type RegisterFormTypes = z.infer<typeof registerSchema>;
export type ForgotPasswordFormTypes = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormTypes = z.infer<typeof resetPasswordSchema>;
export type OtpFormTypes = z.infer<typeof otpSchmea>;


export type AuthResponseTypes = {
  statusCode: number;
  data: {
    accessToken?: string;
    refreshToken?: string;
  };
  message: string;
  success: boolean;
};

export type LoginType = (data: LoginFormTypes) => Promise<AuthResponseTypes>;

export type RegisterType = (
  data: RegisterFormTypes
) => Promise<AuthResponseTypes>;

export type VerifyOtpType = (data: OtpFormTypes) => Promise<AuthResponseTypes>;

export type ForgotPasswordType = (
  data: ForgotPasswordFormTypes
) => Promise<AuthResponseTypes>;

export type ResetPasswordType = ({
  data,
  resetToken,
}: {
  data: ResetPasswordFormTypes;
  resetToken: string;
}) => Promise<AuthResponseTypes>;
