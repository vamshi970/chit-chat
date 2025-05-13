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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const constants_1 = require("../src/constants");
const ApiError_1 = require("../utils/ApiError");
class ChatService {
    constructor(_chatRepository, _messageRepository) {
        this._chatRepository = _chatRepository;
        this._messageRepository = _messageRepository;
    }
    getAllChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield this._chatRepository.getAllChats(userId);
            if (!chats) {
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "No chats found");
            }
            return chats;
        });
    }
    getChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._chatRepository.getChat(chatId);
            if (!chat) {
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Chat not found");
            }
            return chat;
        });
    }
    deleteChat(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._chatRepository.deleteChat(chatId);
            if (!chat) {
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Chat not found");
            }
            return chat;
        });
    }
    sendMessage(userId, chatId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this._chatRepository.getChatById(chatId);
            if (!chat) {
                throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Chat not found");
            }
            const newMessage = yield this._messageRepository.createMessage(userId, chatId, message);
            chat.messages.push(newMessage._id);
            chat.lastMessage = newMessage.message;
            yield chat.save();
            return { newMessage, chat };
        });
    }
}
exports.ChatService = ChatService;
