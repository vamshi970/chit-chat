import { api } from "./axios";

export const getUser = async () => {
  const response = await api.get("/user/me");
  return response.data.data;
};

export const fetchNotifications = async () => {
  const response = await api.get("/user/notifications");
  return response.data.data;
};

export const sendFriendRequest = async (data: { friendId: string }) => {
  const response = await api.post("/user/add-friend", data);
  return response.data;
};

export const handleFriendRequest = async (data: {
  friendId: string;
  accept: boolean;
}) => {
  const response = await api.post("/user/accept-friend", data);
  return response.data;
};
