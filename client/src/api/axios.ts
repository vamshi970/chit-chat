import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
});

//headers
api.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage();

  const token = getItem("accessToken");
  if (token && token.token) {
    config.headers.auth = `Bearer ${token.token}`;
  }
  return config;
});

//response

//error

//refreshToken
