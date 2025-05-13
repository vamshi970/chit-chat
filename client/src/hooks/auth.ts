import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  ForgotPasswordFormTypes,
  LoginFormTypes,
  OtpFormTypes,
  RegisterFormTypes,
  ResetPasswordFormTypes,
  forgotPasswordSchema,
  loginSchema,
  otpSchmea,
  registerSchema,
  resetPasswordSchema,
} from "../types/auth.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword, login, resetPassword, signup, verifyOtp } from "../api/auth";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_EMAIL_SENT_ROUTE,
  VERIFY_OTP_ROUTE,
} from "../utils/constants";
import { AxiosError } from "axios";
import { useLocalStorage } from "./useLocalStorage";

/*-----------Login Mutation-----------*/

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormTypes>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.data.accessToken) {
        setItem("accessToken", { token: data.data.accessToken });
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(HOME_ROUTE);
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
    console.log(data);
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isPending,
    isError,
    error,
  };
};

/*-----------Forgot Password Mutation-----------*/
export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormTypes>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      console.log("Successfully sent reset link to email");
      navigate(RESET_PASSWORD_EMAIL_SENT_ROUTE, { replace: true });
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormTypes> = (data) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isPending,
    isError,
  };
};

/*-----------Verify Otp Mutation-----------*/
export const useVerifyOtpMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setItem } = useLocalStorage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormTypes>({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpSchmea),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data.data.accessToken) {
        setItem("accessToken", { token: data.data.accessToken });
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate(HOME_ROUTE);
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  });

  const onSubmit: SubmitHandler<OtpFormTypes> = (data) => {
    console.log(data);
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isPending,
    isError,
  };
};

/*-----------Sign Up Mutation-----------*/
export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormTypes>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      about: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // if (data.success) {
      //   toast.success(data.message);
      //   navigate(VERIFY_OTP_ROUTE);
      // }
      navigate(VERIFY_OTP_ROUTE);
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormTypes> = (data) => {
    console.log("Clicked");
    mutate(data);
    setItem("email", { email: data.email });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isPending,
    isError,
  };
};

/*-----------Reset Password Mutation-----------*/
export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  const { resetToken = "" } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormTypes>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      console.log("Password Reset Successful");
      navigate(LOGIN_ROUTE, { replace: true });
    },
    onError: (err: AxiosError) => {
      console.error("Error from server:", (err.response?.data as Error).message);
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormTypes> = (data) => {
    mutate({ data, resetToken });
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isPending,
  };
};
