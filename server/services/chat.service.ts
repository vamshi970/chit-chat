import { Types } from "mongoose";
import { ChatRepository } from "../repositories/chat.repository";
import { MessageRepository } from "../repositories/message.repository";
import { STATUS_BAD_REQUEST } from "../src/constants";
import { ApiError } from "../utils/ApiError";
import { deleteChat } from "../controllers/chat.controller";

export class ChatService {
  constructor(
    private readonly _chatRepository: ChatRepository,
    private readonly _messageRepository: MessageRepository
  ) {}

  async getAllChats(userId: Types.ObjectId) {
    const chats = await this._chatRepository.getAllChats(userId);

    if (!chats) {
      throw new ApiError(STATUS_BAD_REQUEST, "No chats found");
    }

    return chats;
  }

  async getChat(chatId: string) {
    const chat = await this._chatRepository.getChat(chatId);

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }

    return chat;
  }

  async deleteChat (chatId: string) {
    const chat = await this._chatRepository.deleteChat(chatId);

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }

    return chat;
  }


  async sendMessage(userId: Types.ObjectId, chatId: string, message: string) {
    const chat = await this._chatRepository.getChatById(chatId);

    if (!chat) {
      throw new ApiError(STATUS_BAD_REQUEST, "Chat not found");
    }

    const newMessage = await this._messageRepository.createMessage(userId, chatId, message);

    chat.messages.push(newMessage._id);
    chat.lastMessage = newMessage.message;
    await chat.save();

    return { newMessage, chat };
  }


}
