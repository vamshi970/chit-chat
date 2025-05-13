import { api } from "./axios";

export const fetchContacts = async () => {
  const response = await api.get("/user/all");
  return response.data.data;
};

export const fetchChats = async () => {
  const { data } = await api.get("/chat");
  return data.data;
};

export const fetchChat = async (chatId: string | undefined) => {
  if (!chatId) return;

  const response = await api.get(`/chat/${chatId}`);
  return response.data.data.messages;
};

export const sendMessage = async ({ message, chatId }: { message: string; chatId: string }) => {
  if (!chatId) return;
  const response = await api.post(`/chat/${chatId}`, {
    message,
  });
  return response.data.data;
};
