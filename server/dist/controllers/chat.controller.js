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
exports.sendMessage = exports.deleteChat = exports.getChat = exports.getAllChats = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("../src/constants");
const ApiResponse_1 = require("../utils/ApiResponse");
const socket_1 = require("../src/socket");
const server_1 = require("../src/server");
/*---------------------- @CHATS ---------------------*/
/*---------------- Get All Chats of a User  ------------------*/
exports.getAllChats = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return;
    const chats = yield server_1.chatService.getAllChats(userId);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, chats, "Successfully retrieved all chats"));
}));
/*---------------- Get Chat  ------------------*/
exports.getChat = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const chat = yield server_1.chatService.getChat(chatId);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, chat, "Successfully retrieved chat"));
}));
/*---------------- Delete Chat  ------------------*/
exports.deleteChat = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const chat = yield server_1.chatService.deleteChat(chatId);
    res.status(200).json(new ApiResponse_1.ApiResponse(200, chat, "Successfully deleted chat"));
}));
/*---------------------- @MESSAGES ---------------------*/
//create message
exports.sendMessage = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = req.body;
    const { chatId } = req.params;
    const userId = req.userId;
    if (!message || !chatId || !userId) {
        throw new ApiError_1.ApiError(constants_1.STATUS_BAD_REQUEST, "Invalid request");
    }
    const { newMessage, chat } = yield server_1.chatService.sendMessage(userId, chatId, message);
    res.status(200).json(new ApiResponse_1.ApiResponse(constants_1.STATUS_OK, newMessage, "Message sent successfully"));
    const members = chat.members.filter((member) => member !== userId);
    const membersSocketIds = members.map((member) => {
        const userSocketId = socket_1.onlineUserIds.get(member.toString());
        return userSocketId;
    });
    req.app.get("io").to(membersSocketIds).emit(constants_1.CHAT_MESSAGE, newMessage);
}));
//edit message
//delete message
/*---------------------- @GROUPS ---------------------*/
//create group
//rename group
//delete group
//add admin
//add member to group
//remove member from group
//exit group
